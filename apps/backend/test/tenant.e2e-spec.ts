import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

describe('Tenant Isolation & Dashboard Authorization (e2e)', () => {
  let app: INestApplication;

  let prisma: PrismaClient;
  let server: any;
  let jwtService: JwtService;
  let pool: Pool;

  let platformToken = '';
  let brandAToken = '';
  let brandBToken = '';

  let orgAId = '';
  let orgBId = '';

  beforeAll(async () => {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    prisma = new PrismaClient({ adapter, log: ['error'] });
    // 1. Module Compilation
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
    jwtService = app.get(JwtService);

    // 2. Database Teardown
    await prisma.membership.deleteMany();
    await prisma.organizationProduct.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.userRole.deleteMany();
    await prisma.role.deleteMany();
    await prisma.user.deleteMany();
    await prisma.organizationType.deleteMany();

    // 3. Setup Organization Types
    const platformType = await prisma.organizationType.create({
      data: { code: 'PLATFORM', displayName: 'Platform' },
    });
    const brandType = await prisma.organizationType.create({
      data: { code: 'BRAND', displayName: 'Brand' },
    });

    // 4. Setup Organizations
    const platformOrg = await prisma.organization.create({
      data: {
        typeId: platformType.id,
        name: 'Autoshipp Internal',
        slug: 'autoshipp',
        displayName: 'Autoshipp',
        timezone: 'UTC',
        currencyCode: 'USD',
        languageCode: 'en',
      },
    });

    const orgA = await prisma.organization.create({
      data: {
        typeId: brandType.id,
        name: 'Brand A',
        slug: 'brand-a',
        displayName: 'Brand A Inc.',
        timezone: 'UTC',
        currencyCode: 'USD',
        languageCode: 'en',
      },
    });
    orgAId = orgA.id;

    const orgB = await prisma.organization.create({
      data: {
        typeId: brandType.id,
        name: 'Brand B',
        slug: 'brand-b',
        displayName: 'Brand B Inc.',
        timezone: 'UTC',
        currencyCode: 'USD',
        languageCode: 'en',
      },
    });
    orgBId = orgB.id;

    // 5. Setup Users and Memberships
    const hash = await bcrypt.hash('Password123!', 10);

    const platformUser = await prisma.user.create({
      data: { email: 'admin@autoshipp.com', passwordHash: hash },
    });
    await prisma.membership.create({
      data: { userId: platformUser.id, organizationId: platformOrg.id },
    });

    const userA = await prisma.user.create({
      data: { email: 'user@branda.com', passwordHash: hash },
    });
    await prisma.membership.create({
      data: { userId: userA.id, organizationId: orgA.id },
    });

    const userB = await prisma.user.create({
      data: { email: 'user@brandb.com', passwordHash: hash },
    });
    await prisma.membership.create({
      data: { userId: userB.id, organizationId: orgB.id },
    });

    // 6. Generate Tokens
    const login = async (email: string) => {
      const res = await request(server)
        .post('/auth/login')
        .send({ email, password: 'Password123!' });
      const cookies = res.headers['set-cookie'] as unknown as string[];
      const tokenCookie = cookies.find((c: string) =>
        c.startsWith('access_token='),
      );
      return tokenCookie!.split(';')[0].split('=')[1];
    };

    platformToken = await login(platformUser.email);
    brandAToken = await login(userA.email);
    brandBToken = await login(userB.email);
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  describe('Tenant Isolation (OrganizationsController)', () => {
    it('User A can access Organization A', async () => {
      const res = await request(server)
        .get(`/organizations/${orgAId}`)
        .set('Authorization', `Bearer ${brandAToken}`)
        .expect(200);

      expect(res.body.id).toBe(orgAId);
    });

    it('User A CANNOT access Organization B (404/403 due to membership filter)', async () => {
      await request(server)
        .get(`/organizations/${orgBId}`)
        .set('Authorization', `Bearer ${brandAToken}`)
        .expect(404); // OrganizationsService throws NotFound if not found in membership
    });

    it('Membership filtering works correctly on index', async () => {
      const res = await request(server)
        .get('/organizations')
        .set('Authorization', `Bearer ${brandAToken}`)
        .expect(200);

      // Should only return Org A
      expect(res.body).toHaveLength(1);
      expect(res.body[0].id).toBe(orgAId);
    });
  });

  describe('Dashboard Authorization (PlatformRoleGuard)', () => {
    it('PLATFORM users can access platform summary', async () => {
      const res = await request(server)
        .get('/dashboard/platform/summary')
        .set('Authorization', `Bearer ${platformToken}`)
        .expect(200);

      expect(res.body).toHaveProperty('kpis');
      expect(res.body).toHaveProperty('recentOrganizations');
      expect(res.body.kpis.organizationCount).toBe(3);
    });

    it('Dashboard rejects non-PLATFORM users (403)', async () => {
      const res = await request(server)
        .get('/dashboard/platform/summary')
        .set('Authorization', `Bearer ${brandAToken}`)
        .expect(403);

      expect(res.body.message).toContain('Platform administrators only');
    });

    it('401 when no token is provided to dashboard', async () => {
      await request(server).get('/dashboard/platform/summary').expect(401);
    });
  });
});
