import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<any | null> {
    const users = await this.prisma.$queryRawUnsafe<any[]>(
      'SELECT * FROM identity_users WHERE email = $1::text LIMIT 1',
      email
    );
    if (!users || users.length === 0) return null;
    const user = users[0];
    return {
      ...user,
      passwordHash: user.password_hash
    };
  }

  async checkClient(email: string) {
    const user = await this.findOne(email);
    if (!user) {
      return { active: false, reason: 'user_not_found' };
    }

    const userAccount = await this.prisma.$queryRawUnsafe<any[]>(
      'SELECT account_id FROM identity_user_accounts WHERE user_id = $1::uuid LIMIT 1',
      user.id
    );

    if (!userAccount || userAccount.length === 0) {
      return { active: false, reason: 'no_tenant' };
    }

    const accountId = userAccount[0].account_id;

    const account = await this.prisma.$queryRawUnsafe<any[]>(
      'SELECT id, name, status, type FROM core_accounts WHERE id = $1::uuid LIMIT 1',
      accountId
    );

    if (!account || account.length === 0) {
      return { active: false, reason: 'account_not_found' };
    }

    if (account[0].status !== 'active') {
      return { active: false, reason: 'account_inactive', accountName: account[0].name };
    }

    return {
      active: true,
      tenantId: account[0].id,
      accountName: account[0].name,
      status: account[0].status
    };
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
}
