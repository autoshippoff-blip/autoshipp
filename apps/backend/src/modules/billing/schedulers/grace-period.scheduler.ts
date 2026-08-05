import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { SubscriptionLifecycleService } from '../services/subscription-lifecycle.service';

@Injectable()
export class GracePeriodScheduler implements OnApplicationBootstrap {
  private readonly logger = new Logger(GracePeriodScheduler.name);

  constructor(
    @InjectQueue('subscription-lifecycle') private readonly queue: Queue,
    private readonly lifecycleService: SubscriptionLifecycleService,
  ) {}

  async onApplicationBootstrap() {
    this.logger.log('Scheduling GracePeriodScheduler job');

    // Add repeatable job to BullMQ
    await this.queue.add(
      'CHECK_EXPIRED_GRACE_PERIODS',
      {},
      {
        repeat: {
          pattern: '0 6 * * *', // Daily at 6 AM
        },
        jobId: 'check-expired-grace-periods',
      },
    );
  }

  // We could also allow a manual trigger
  async triggerNow() {
    this.logger.log('Manually triggering check for expired grace periods');
    await this.lifecycleService.processExpiredGracePeriods();
  }
}
