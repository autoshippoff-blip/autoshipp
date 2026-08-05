import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { Response } from 'express';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(
    @Body() body: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const preferredOrgId = body.organizationId || body.preferredOrgId;
    const tokenResult = await this.authService.login(user, preferredOrgId);

    // Handling multi-org selection response
    if ((tokenResult as any).action === 'ORGANIZATION_SELECTION_REQUIRED') {
      return tokenResult;
    }

    response.cookie('access_token', tokenResult.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      user: tokenResult.user,
      access_token: tokenResult.access_token,
      active_organization_id: tokenResult.active_organization_id,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('switch-organization')
  async switchOrganization(
    @Request() req: any,
    @Body() body: { targetOrganizationId: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!body?.targetOrganizationId) {
      throw new UnauthorizedException('targetOrganizationId is required');
    }

    const result = await this.authService.switchOrganization(
      req.user.id,
      body.targetOrganizationId,
    );

    response.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      status: 'ORGANIZATION_SWITCHED',
      active_organization_id: result.active_organization_id,
      role: result.role,
      access_token: result.access_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('check-client')
  async checkClient(@Request() req: any) {
    return this.usersService.checkClient(req.user.email);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    return { message: 'Logged out successfully' };
  }
}
