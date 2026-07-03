import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

describe('Authentication (e2e)', () => {
  let app: INestApplication;

  let prisma: PrismaClient;
  let server: any;
  let pool: Pool;

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

    // 2. Database Teardown
    await prisma.membership.deleteMany();
    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.organizationType.deleteMany();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  const testUser = {
    email: 'test@example.com',
    password: 'Password123!',
    firstName: 'Test',
    lastName: 'User',
  };

  let token = '';

  it('/auth/register (POST)', async () => {
    const res = await request(server)
      .post('/auth/register')
      .send(testUser)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe(testUser.email);
    expect(res.body).not.toHaveProperty('passwordHash');
  });

  it('/auth/register (POST) - Duplicate Email', async () => {
    await request(server).post('/auth/register').send(testUser).expect(401);
  });

  it('/auth/login (POST) - Invalid Password', async () => {
    await request(server)
      .post('/auth/login')
      .send({ email: testUser.email, password: 'WrongPassword' })
      .expect(401);
  });

  it('/auth/login (POST)', async () => {
    const res = await request(server)
      .post('/auth/login')
      .send({ email: testUser.email, password: testUser.password })
      .expect(201); // NestJS defaults POST to 201

    const cookies = res.headers['set-cookie'] as unknown as string[];
    expect(cookies).toBeDefined();

    const tokenCookie = cookies.find((c: string) =>
      c.startsWith('access_token='),
    );
    expect(tokenCookie).toBeDefined();

    token = tokenCookie!.split(';')[0].split('=')[1];

    expect(res.body.user.email).toBe(testUser.email);
  });

  it('JWT Payload Generation', () => {
    // Decode the token locally to verify its contents securely
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    );
    expect(payload).toHaveProperty('sub');
    expect(payload).toHaveProperty('token_version');
    // Email should NOT be present (Security Rule)
    expect(payload).not.toHaveProperty('email');
  });

  it('JwtStrategy Validation (Accessing protected route)', async () => {
    const res = await request(server)
      .get('/organizations') // assuming GET /organizations is protected
      .set('Authorization', `Bearer ${token}`);

    if (res.status !== 200) {
      console.error('JwtStrategy Validation failed:', res.body);
    }
    expect(res.status).toBe(200);
  });

  it('401 Responses without Token', async () => {
    await request(server).get('/organizations').expect(401);
  });

  it('token_version invalidation', async () => {
    // 1. Manually update token version in DB
    await prisma.user.update({
      where: { email: testUser.email },
      data: { tokenVersion: 2 },
    });

    // 2. Try to use old token
    await request(server)
      .get('/organizations')
      .set('Authorization', `Bearer ${token}`)
      .expect(401); // Unauthorized because token_version mismatch
  });
});
