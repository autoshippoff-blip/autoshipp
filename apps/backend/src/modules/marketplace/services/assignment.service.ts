import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { AssignmentModel } from '../domain/marketplace.models';
import {
  SubscriptionNotFoundException,
  SubscriptionInactiveException,
  AssignmentAlreadyExistsException,
  UnauthorizedHierarchyAssignmentException,
} from '../exceptions/marketplace.exceptions';
import { SubscriptionStatus, RelationshipType } from '@prisma/client';

/**
 * AssignmentService (Marketplace & Licensing Domain)
 *
 * Responsibility: Managing the right to use subscribed products within a hierarchy.
 */
@Injectable()
export class AssignmentService {
  constructor(private readonly prisma: PrismaService) {}

  private mapToDomain(
    prismaAssignment: any,
    subscriptionActive: boolean,
  ): AssignmentModel {
    return {
      id: prismaAssignment.id,
      subscriptionId: prismaAssignment.subscriptionId,
      organizationId: prismaAssignment.organizationId,
      assignedAt: prismaAssignment.assignedAt,
      assignedBy: prismaAssignment.assignedBy,
      isActive: subscriptionActive && prismaAssignment.isActive,
      suspendedAt: prismaAssignment.suspendedAt,
      suspensionReason: prismaAssignment.suspensionReason,
    };
  }

  private isSubscriptionValid(subscription: any): boolean {
    if (subscription.status !== SubscriptionStatus.ACTIVE) return false;

    const now = new Date();
    if (now < subscription.effectiveFrom) return false;
    if (subscription.effectiveUntil && now > subscription.effectiveUntil)
      return false;

    return true;
  }

  async assignProduct(
    subscriptionId: string,
    targetOrgId: string,
    assignerUserId: string,
    assignerOrgId: string,
  ): Promise<AssignmentModel> {
    // Transaction Boundary: Hierarchy validation, duplication check, and creation must be atomic
    return await this.prisma.$transaction(async (tx) => {
      // 1. Fetch subscription and verify it belongs to the assigner
      const subscription = await tx.subscription.findUnique({
        where: { id: subscriptionId },
      });

      if (!subscription || subscription.organizationId !== assignerOrgId) {
        throw new SubscriptionNotFoundException(subscriptionId);
      }

      // 2. Domain Invariant: Prevent dormant subscriptions from creating assignments
      if (!this.isSubscriptionValid(subscription)) {
        throw new SubscriptionInactiveException(subscriptionId);
      }

      // 3. Domain Invariant: Hierarchy Validation (D-166)
      // Assigner must manage Target (this assumes standard relationship structures exist in Prisma, simulating it here via the relationship model).
      // Assuming 'OrganizationRelationship' exists from Wallet phase:
      const hierarchy = await tx.organizationRelationship.findFirst({
        where: {
          parentOrganizationId: assignerOrgId,
          childOrganizationId: targetOrgId,
          relationshipType: RelationshipType.MANAGES,
        },
      });

      if (!hierarchy && assignerOrgId !== targetOrgId) {
        // A brand can assign to itself, or an aggregator can assign to a managed brand
        throw new UnauthorizedHierarchyAssignmentException(
          assignerUserId,
          targetOrgId,
        );
      }

      // 4. Duplicate Validation
      const existing = await tx.assignment.findUnique({
        where: {
          subscriptionId_organizationId: {
            subscriptionId,
            organizationId: targetOrgId,
          },
        },
      });

      if (existing) {
        throw new AssignmentAlreadyExistsException(targetOrgId, subscriptionId);
      }

      // 5. Creation
      const assignment = await tx.assignment.create({
        data: {
          subscriptionId,
          organizationId: targetOrgId,
          assignedBy: assignerUserId,
        },
      });

      return this.mapToDomain(assignment, true);
    });
  }

  async revokeAssignment(
    subscriptionId: string,
    targetOrgId: string,
    assignerOrgId: string,
  ): Promise<void> {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id: subscriptionId },
    });

    if (!subscription || subscription.organizationId !== assignerOrgId) {
      throw new SubscriptionNotFoundException(subscriptionId);
    }

    await this.prisma.assignment.delete({
      where: {
        subscriptionId_organizationId: {
          subscriptionId,
          organizationId: targetOrgId,
        },
      },
    });
  }

  async getActiveAssignments(
    organizationId: string,
  ): Promise<AssignmentModel[]> {
    const assignments = await this.prisma.assignment.findMany({
      where: { organizationId },
      include: { subscription: true },
    });

    return assignments
      .map((a) => this.mapToDomain(a, this.isSubscriptionValid(a.subscription)))
      .filter((a) => a.isActive); // Domain Invariant: dynamic validity
  }

  async suspendAssignmentsByOrgId(
    organizationId: string,
    reason: string,
  ): Promise<number> {
    const result = await this.prisma.assignment.updateMany({
      where: {
        organizationId,
        isActive: true,
      },
      data: {
        isActive: false,
        suspendedAt: new Date(),
        suspensionReason: reason,
      },
    });
    return result.count;
  }

  async restoreAssignmentsByOrgId(
    organizationId: string,
    reasonFilter: string = 'SUBSCRIPTION_EXPIRED',
  ): Promise<number> {
    const whereCondition: any = {
      organizationId,
      isActive: false,
    };

    if (reasonFilter !== 'ALL') {
      whereCondition.suspensionReason = reasonFilter;
    }

    const result = await this.prisma.assignment.updateMany({
      where: whereCondition,
      data: {
        isActive: true,
        suspendedAt: null,
        suspensionReason: null,
      },
    });
    return result.count;
  }
}
