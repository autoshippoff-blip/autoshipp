import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('Organization Relationships API - Implementation Review', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;

  let platformAdminToken: string;
  let aggregatorAdminToken: string;
  let brandAdminToken: string;

  let platformOrgId: string;
  let aggregator1Id: string;
  let aggregator2Id: string;
  let brandId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
    jwtService = app.get<JwtService>(JwtService);

    // Cleanup before starting to avoid unique constraint errors on retries
    await prisma.organizationTransferHistory.deleteMany();
    await prisma.organizationRelationship.deleteMany();
    await prisma.membership.deleteMany();
    await prisma.user.deleteMany({
      where: {
        email: { in: ['plat@test.com', 'agg@test.com', 'brand@test.com'] },
      },
    });
    await prisma.organization.deleteMany({
      where: {
        slug: { in: ['plat-test', 'agg-1-test', 'agg-2-test', 'brand-test'] },
      },
    });

    // Setup DB state
    const platformType = await prisma.organizationType.upsert({
      where: { code: 'PLATFORM' },
      update: {},
      create: {
        code: 'PLATFORM',
        displayName: 'Platform',
        description: 'Platform',
      },
    });
    const aggregatorType = await prisma.organizationType.upsert({
      where: { code: 'AGGREGATOR' },
      update: {},
      create: {
        code: 'AGGREGATOR',
        displayName: 'Aggregator',
        description: 'Aggregator',
      },
    });
    const brandType = await prisma.organizationType.upsert({
      where: { code: 'BRAND' },
      update: {},
      create: { code: 'BRAND', displayName: 'Brand', description: 'Brand' },
    });

    const platformOrg = await prisma.organization.create({
      data: {
        name: 'Platform',
        slug: 'plat-test' + Date.now(),
        displayName: 'Platform',
        typeId: platformType.id,
        timezone: 'UTC',
        currencyCode: 'USD',
        languageCode: 'en',
      },
    });
    platformOrgId = platformOrg.id;

    const agg1 = await prisma.organization.create({
      data: {
        name: 'Agg 1',
        slug: 'agg-1-test' + Date.now(),
        displayName: 'Agg 1',
        typeId: aggregatorType.id,
        timezone: 'UTC',
        currencyCode: 'USD',
        languageCode: 'en',
      },
    });
    aggregator1Id = agg1.id;

    const agg2 = await prisma.organization.create({
      data: {
        name: 'Agg 2',
        slug: 'agg-2-test' + Date.now(),
        displayName: 'Agg 2',
        typeId: aggregatorType.id,
        timezone: 'UTC',
        currencyCode: 'USD',
        languageCode: 'en',
      },
    });
    aggregator2Id = agg2.id;

    const brand = await prisma.organization.create({
      data: {
        name: 'Brand',
        slug: 'brand-test' + Date.now(),
        displayName: 'Brand',
        typeId: brandType.id,
        timezone: 'UTC',
        currencyCode: 'USD',
        languageCode: 'en',
      },
    });
    brandId = brand.id;

    // Platform user
    const platUser = await prisma.user.create({
      data: {
        email: 'plat@test.com',
        firstName: 'Plat',
        lastName: 'User',
        passwordHash: 'hash',
      },
    });
    await prisma.membership.create({
      data: { userId: platUser.id, organizationId: platformOrgId },
    });
    platformAdminToken = jwtService.sign({
      sub: platUser.id,
      token_version: 1,
      organization_id: platformOrgId,
      organization_type: 'PLATFORM',
    });

    // Aggregator user
    const aggUser = await prisma.user.create({
      data: {
        email: 'agg@test.com',
        firstName: 'Agg',
        lastName: 'User',
        passwordHash: 'hash',
      },
    });
    await prisma.membership.create({
      data: { userId: aggUser.id, organizationId: aggregator1Id },
    });
    aggregatorAdminToken = jwtService.sign({
      sub: aggUser.id,
      token_version: 1,
      organization_id: aggregator1Id,
      organization_type: 'AGGREGATOR',
    });

    // Brand user
    const brandUser = await prisma.user.create({
      data: {
        email: 'brand@test.com',
        firstName: 'Brand',
        lastName: 'User',
        passwordHash: 'hash',
      },
    });
    await prisma.membership.create({
      data: { userId: brandUser.id, organizationId: brandId },
    });
    brandAdminToken = jwtService.sign({
      sub: brandUser.id,
      token_version: 1,
      organization_id: brandId,
      organization_type: 'BRAND',
    });
  });

  afterAll(async () => {
    // Cleanup
    await prisma.organizationTransferHistory.deleteMany();
    await prisma.organizationRelationship.deleteMany();
    await prisma.membership.deleteMany();
    await prisma.user.deleteMany({
      where: {
        email: { in: ['plat@test.com', 'agg@test.com', 'brand@test.com'] },
      },
    });
    await prisma.organization.deleteMany({
      where: {
        slug: { in: ['plat-test', 'agg-1-test', 'agg-2-test', 'brand-test'] },
      },
    });
    await app.close();
  });

  describe('Part 3 - Tenant Isolation', () => {
    it('BRAND user gets 403', async () => {
      const res = await request(app.getHttpServer())
        .post(`/organizations/${brandId}/transfer`)
        .set('Authorization', `Bearer ${brandAdminToken}`)
        .send({ newParentId: aggregator1Id, reason: 'test' });

      expect(res.status).toBe(403);
    });

    it('AGGREGATOR user gets 403', async () => {
      const res = await request(app.getHttpServer())
        .post(`/organizations/${brandId}/transfer`)
        .set('Authorization', `Bearer ${aggregatorAdminToken}`)
        .send({ newParentId: aggregator2Id, reason: 'test' });

      expect(res.status).toBe(403);
    });
  });

  describe('Part 2 - Runtime Validation', () => {
    it('Valid transfer: Aggregator -> Brand to another Aggregator', async () => {
      // Setup initial relationship: PLATFORM -> AGG1 -> BRAND
      await request(app.getHttpServer())
        .post(`/organizations/${brandId}/relationships`)
        .set('Authorization', `Bearer ${platformAdminToken}`)
        .send({
          parentOrganizationId: aggregator1Id,
          relationshipType: 'MANAGES',
        })
        .expect(201);

      // Perform transfer
      const res = await request(app.getHttpServer())
        .post(`/organizations/${brandId}/transfer`)
        .set('Authorization', `Bearer ${platformAdminToken}`)
        .send({ newParentId: aggregator2Id, reason: 'Business sale' })
        .expect(201);
      expect(res.status).toBe(201);
      expect(res.body.previousParentId).toBe(aggregator1Id);
      expect(res.body.newParentId).toBe(aggregator2Id);
      expect(res.body.organizationId).toBe(brandId);

      // Verify db state
      const oldRel = await prisma.organizationRelationship.findFirst({
        where: {
          childOrganizationId: brandId,
          parentOrganizationId: aggregator1Id,
        },
      });

      expect(oldRel!.active).toBe(false);

      const newRel = await prisma.organizationRelationship.findFirst({
        where: {
          childOrganizationId: brandId,
          parentOrganizationId: aggregator2Id,
        },
      });
      expect(newRel!.active).toBe(true);

      const history = await prisma.organizationTransferHistory.findFirst({
        where: { organizationId: brandId },
      });
      expect(history!.reason).toBe('Business sale');
    });

    it('Cycle prevention: Cannot transfer Aggregator under its own Brand', async () => {
      // Current state: AGG2 -> BRAND
      // Attempt: Transfer AGG2 to have BRAND as parent
      const res = await request(app.getHttpServer())
        .post(`/organizations/${aggregator2Id}/transfer`)
        .set('Authorization', `Bearer ${platformAdminToken}`)
        .send({ newParentId: brandId, reason: 'Cycle' });

      expect(res.status).toBe(400);
      expect(res.body.message).toContain(
        'An AGGREGATOR must be a child of the PLATFORM',
      );
    });

    it('D-166 Validation: Force duplicate active relationship', async () => {
      // Current state: AGG2 -> BRAND (active)
      // Attempt to directly create another active relationship for BRAND
      const res = await request(app.getHttpServer())
        .post(`/organizations/${brandId}/relationships`)
        .set('Authorization', `Bearer ${platformAdminToken}`)
        .send({
          parentOrganizationId: aggregator1Id,
          relationshipType: 'MANAGES',
        });

      expect(res.status).toBe(409);
      expect(res.body.message).toBe(
        'An active relationship of this type already exists for the organization.',
      );
    });
  });
});
