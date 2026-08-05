import { Test, TestingModule } from '@nestjs/testing';
import { WalletModule } from './wallet/wallet.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { WALLET_SERVICE_INTERFACE } from './wallet/wallet.interface';
import {
  ASSIGNMENT_SERVICE_INTERFACE,
  PRODUCT_REGISTRY_INTERFACE,
} from './marketplace/marketplace.interface';

describe('AES-040 Module Boundary & Interface Contract Verification', () => {
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [WalletModule, MarketplaceModule],
    }).compile();
  });

  it('should successfully resolve WALLET_SERVICE_INTERFACE contract symbol', () => {
    const walletService = moduleRef.get(WALLET_SERVICE_INTERFACE);
    expect(walletService).toBeDefined();
    expect(typeof walletService.getBalance).toBe('function');
  });

  it('should successfully resolve ASSIGNMENT_SERVICE_INTERFACE contract symbol', () => {
    const assignmentService = moduleRef.get(ASSIGNMENT_SERVICE_INTERFACE);
    expect(assignmentService).toBeDefined();
    expect(typeof assignmentService.assignProduct).toBe('function');
  });

  it('should successfully resolve PRODUCT_REGISTRY_INTERFACE contract symbol', () => {
    const registryService = moduleRef.get(PRODUCT_REGISTRY_INTERFACE);
    expect(registryService).toBeDefined();
    expect(typeof registryService.registerProduct).toBe('function');
  });
});
