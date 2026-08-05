import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('UsersService Compliance & Erasure (AES-042 §7, D-423, D-426)', () => {
  let service: UsersService;
  let prisma: PrismaService;

  const mockUser = {
    id: 'usr-123',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1234567890',
    avatarUrl: 'https://avatar.example.com/john.jpg',
    status: 'ACTIVE',
    memberships: [
      {
        id: 'mem-1',
        organization: {
          id: 'org-1',
          name: 'Acme Corp',
          metadata: { legal_hold: false },
        },
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              update: jest.fn(),
            },
            session: {
              deleteMany: jest.fn().mockResolvedValue({ count: 2 }),
            },
            $transaction: jest.fn((callback) => callback(prisma)),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should successfully pseudonymize PII and revoke sessions during eraseUser', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser as any);
    jest.spyOn(prisma.user, 'update').mockResolvedValue({
      ...mockUser,
      email: 'deleted_usr-123@deleted.autoshipp.in',
      firstName: 'Deleted',
      lastName: 'User',
      phone: null,
      avatarUrl: null,
      status: 'ARCHIVED',
    } as any);

    const result = await service.eraseUser('usr-123');

    expect(result.email).toBe('deleted_usr-123@deleted.autoshipp.in');
    expect(result.firstName).toBe('Deleted');
    expect(result.lastName).toBe('User');
    expect(result.phone).toBeNull();
    expect(result.avatarUrl).toBeNull();
    expect(result.status).toBe('ARCHIVED');
    expect(prisma.session.deleteMany).toHaveBeenCalledWith({
      where: { userId: 'usr-123' },
    });
  });

  it('should throw ForbiddenException when attempting to erase user belonging to org under active legal hold', async () => {
    const userUnderLegalHold = {
      ...mockUser,
      memberships: [
        {
          id: 'mem-1',
          organization: {
            id: 'org-1',
            name: 'Acme Corp',
            metadata: { legal_hold: true, legal_hold_reason: 'Investigation' },
          },
        },
      ],
    };

    jest
      .spyOn(prisma.user, 'findUnique')
      .mockResolvedValue(userUnderLegalHold as any);

    await expect(service.eraseUser('usr-123')).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should throw NotFoundException if target user for erasure does not exist', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

    await expect(service.eraseUser('non-existent')).rejects.toThrow(
      NotFoundException,
    );
  });
});
