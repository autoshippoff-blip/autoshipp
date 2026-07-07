import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let data = request?.cookies?.['access_token'];
          if (!data) {
            // Fallback to bearer token for easier dev/testing
            const authHeader = request?.headers['authorization'];
            if (authHeader && authHeader.startsWith('Bearer ')) {
              data = authHeader.substring(7);
            }
          }
          return data;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_SECRET || 'super-secret-jwt-key-change-in-production',
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Token Version Validation (AES-005)
    if (user.tokenVersion !== payload.token_version) {
      throw new UnauthorizedException('Token invalid or expired');
    }

    // Omit password hash from req.user
    const { passwordHash, ...result } = user;

    // Inject the tenant context validated from the JWT payload
    return {
      ...result,
      tenantId: payload.organization_id,
      organization_type: payload.organization_type,
    };
  }
}
