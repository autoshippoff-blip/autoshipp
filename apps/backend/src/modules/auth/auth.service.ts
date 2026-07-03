import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const membership =
      user.memberships?.find((m) => m.status === 'ACTIVE') ||
      user.memberships?.[0];
    const payload = {
      sub: user.id,
      organization_id: membership?.organizationId || null,
      organization_type: membership?.organization?.type?.code || null,
      role: membership?.userRoles?.[0]?.role?.code || null,
      token_version: user.tokenVersion,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: payload.role,
      },
    };
  }

  async register(data: any) {
    const { email, password, firstName, lastName } = data;
    const existing = await this.usersService.findOne(email);
    if (existing) {
      throw new UnauthorizedException('Email already exists');
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      email,
      passwordHash: hash,
      firstName,
      lastName,
    });
    const { passwordHash, ...result } = user;
    return result;
  }
}
