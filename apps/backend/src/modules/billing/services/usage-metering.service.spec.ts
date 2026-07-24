import { Test, TestingModule } from '@nestjs/testing';
import { UsageMeteringService } from './usage-metering.service';
import { PrismaService } from '../../../prisma.service';
import { WalletService } from '../../wallet/wallet.service';

describe('UsageMeteringService', () => {
  let service: UsageMeteringService;
  let prismaService: any;
  let walletService: any;

  beforeEach(async () => {
    prismaService = {
      $transaction: jest.fn((callback) => callback(prismaService)),
      usageRecord: {
        create: jest.fn(),
      },
      outboxEvent: {
        create: jest.fn(),
      },
    };

    walletService = {
      resolveWallet: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsageMeteringService,
        { provide: PrismaService, useValue: prismaService },
        { provide: WalletService, useValue: walletService },
      ],
    }).compile();

    service = module.get<UsageMeteringService>(UsageMeteringService);
  });

  it('should record usage, resolve wallet hierarchy, and write Transactional Outbox event', async () => {
    prismaService.usageRecord.create.mockResolvedValue({ id: 'usage-123' });
    walletService.resolveWallet.mockResolvedValue({ id: 'wallet-parent-456' });
    prismaService.outboxEvent.create.mockResolvedValue({ id: 'outbox-789' });

    const result = await service.recordUsage(
      'org-child',
      'AI_INTELLIGENCE',
      5,
      10.0,
    );

    expect(result).toBeDefined();
    expect(prismaService.usageRecord.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        organizationId: 'org-child',
        featureCode: 'AI_INTELLIGENCE',
        quantity: 5,
        totalCost: 50.0,
      }),
    });
    expect(walletService.resolveWallet).toHaveBeenCalledWith('org-child');
    expect(prismaService.outboxEvent.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        aggregateType: 'USAGE_RECORD',
        eventType: 'USAGE_RECORDED',
        status: 'PENDING',
      }),
    });
  });
});
