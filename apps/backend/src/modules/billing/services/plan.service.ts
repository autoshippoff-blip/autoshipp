import { PrismaClient, Plan, PlanPrice, BillingCycle } from '@prisma/client';
import { Prisma } from '@prisma/client';
const Decimal = Prisma.Decimal;
import { PlanNotFoundException } from '../exceptions/billing.exceptions';

export class PlanService {
  constructor(private readonly prisma: PrismaClient) {}

  async createPlan(dto: {
    productId: string;
    code: string;
    name: string;
  }): Promise<Plan> {
    return this.prisma.plan.create({
      data: {
        productId: dto.productId,
        code: dto.code,
        name: dto.name,
      },
    });
  }

  async addPlanPrice(
    planId: string,
    dto: { currency: string; billingCycle: BillingCycle; amount: number },
  ): Promise<PlanPrice> {
    const plan = await this.prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) {
      throw new PlanNotFoundException(planId);
    }

    return this.prisma.$transaction(async (tx) => {
      // Archive previous active prices for the same currency and billing cycle
      await tx.planPrice.updateMany({
        where: {
          planId,
          currency: dto.currency,
          billingCycle: dto.billingCycle,
          effectiveTo: null,
        },
        data: {
          effectiveTo: new Date(),
        },
      });

      // Insert new price
      return tx.planPrice.create({
        data: {
          planId,
          currency: dto.currency,
          billingCycle: dto.billingCycle,
          amount: new Decimal(dto.amount),
          effectiveFrom: new Date(),
        },
      });
    });
  }

  async getPlanPrices(planId: string): Promise<PlanPrice[]> {
    return this.prisma.planPrice.findMany({
      where: { planId },
      orderBy: { effectiveFrom: 'desc' },
    });
  }
}
