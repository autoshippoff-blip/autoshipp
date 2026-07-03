import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [AuthModule, UsersModule, OrganizationsModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
