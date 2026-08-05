import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { AssignmentService } from '../../marketplace/services/assignment.service';
import { SubscriptionLifecycleService } from '../services/subscription-lifecycle.service';

@Processor('subscription-lifecycle')
export class SubscriptionLifecycleProcessor extends WorkerHost {
  private readonly logger = new Logger(SubscriptionLifecycleProcessor.name);

  constructor(
    private readonly assignmentService: AssignmentService,
    private readonly lifecycleService: SubscriptionLifecycleService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);

    try {
      switch (job.name) {
        case 'CHECK_EXPIRED_GRACE_PERIODS':
          await this.lifecycleService.processExpiredGracePeriods();
          break;
        case 'GRACE_PERIOD_EXPIRED':
          await this.handleGracePeriodExpired(job.data);
          break;
        case 'ACCESS_SUSPENDED':
          await this.handleAccessSuspended(job.data);
          break;
        case 'ACCESS_RESTORED':
          await this.handleAccessRestored(job.data);
          break;
        default:
          this.logger.warn(`Unknown job name: ${job.name}`);
      }
    } catch (error) {
      this.logger.error(`Failed to process job ${job.id}`, error);
      throw error;
    }
  }

  private async handleGracePeriodExpired(data: any) {
    const { subscriptionId, organizationId } = data;
    this.logger.log(`Grace period expired for subscription ${subscriptionId}`);

    // 1. Suspend the subscription itself
    await this.lifecycleService.suspendSubscription(
      subscriptionId,
      'SUBSCRIPTION_EXPIRED',
    );
  }

  private async handleAccessSuspended(data: any) {
    const { organizationId, reason } = data;
    this.logger.log(`Suspending assignments for org ${organizationId}`);

    // 2. Suspend assignments in marketplace
    const count = await this.assignmentService.suspendAssignmentsByOrgId(
      organizationId,
      reason,
    );
    this.logger.log(`Suspended ${count} assignments for org ${organizationId}`);
  }

  private async handleAccessRestored(data: any) {
    const { organizationId, reason } = data;
    this.logger.log(`Restoring assignments for org ${organizationId}`);

    // Only restore if the suspension was due to subscription expiry (or manual action if specified)
    if (reason === 'SUBSCRIPTION_EXPIRED') {
      const count =
        await this.assignmentService.restoreAssignmentsByOrgId(organizationId);
      this.logger.log(
        `Restored ${count} assignments for org ${organizationId}`,
      );
    } else {
      this.logger.log(
        `Skipping restore for org ${organizationId} as reason is ${reason}`,
      );
    }
  }
}
