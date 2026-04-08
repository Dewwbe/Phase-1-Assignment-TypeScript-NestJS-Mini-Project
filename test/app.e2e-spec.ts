import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import type { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';

describe('Users API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    app.useGlobalFilters(new HttpExceptionFilter());

    await app.init();
  });

  it('GET /health should return health status', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({ status: 'ok' });
  });

  it('POST /users should create a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        age: 25,
      })
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User created successfully');
    expect(response.body.data.email).toBe('john@example.com');
    expect(response.body.data.isActive).toBe(true);
    expect(response.body.data.id).toBeDefined();
  });

  it('POST /users should fail for invalid input', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        firstName: '',
        lastName: 'D',
        email: 'wrong-email',
        age: 10,
      })
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBeDefined();
  });

  it('GET /users should return all users', async () => {
    await request(app.getHttpServer()).post('/users').send({
      firstName: 'Alice',
      lastName: 'Perera',
      email: 'alice@example.com',
      age: 24,
    });

    await request(app.getHttpServer()).post('/users').send({
      firstName: 'Brian',
      lastName: 'Fernando',
      email: 'brian@example.com',
      age: 27,
    });

    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBe(2);
  });

  it('GET /users?page=1&limit=1 should return paginated users', async () => {
    await request(app.getHttpServer()).post('/users').send({
      firstName: 'User1',
      lastName: 'One',
      email: 'user1@example.com',
      age: 22,
    });

    await request(app.getHttpServer()).post('/users').send({
      firstName: 'User2',
      lastName: 'Two',
      email: 'user2@example.com',
      age: 23,
    });

    const response = await request(app.getHttpServer())
      .get('/users?page=1&limit=1')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBe(1);
  });

  it('GET /users/:id should return a user by id', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/users')
      .send({
        firstName: 'Carl',
        lastName: 'Silva',
        email: 'carl@example.com',
        age: 29,
      })
      .expect(201);

    const userId = createResponse.body.data.id;

    const response = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(userId);
  });

  it('GET /users/:id should fail for invalid UUID', async () => {
    const response = await request(app.getHttpServer())
      .get('/users/not-a-uuid')
      .expect(400);

    expect(response.body.success).toBe(false);
  });

  it('GET /users/:id should return 404 for non-existing user', async () => {
    const response = await request(app.getHttpServer())
      .get('/users/550e8400-e29b-41d4-a716-446655440000')
      .expect(404);

    expect(response.body.success).toBe(false);
  });

  it('PATCH /users/:id should update a user', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/users')
      .send({
        firstName: 'Dina',
        lastName: 'Paul',
        email: 'dina@example.com',
        age: 26,
      })
      .expect(201);

    const userId = createResponse.body.data.id;

    const response = await request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .send({
        firstName: 'Dina Updated',
        isActive: false,
      })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.firstName).toBe('Dina Updated');
    expect(response.body.data.isActive).toBe(false);
  });

  it('PATCH /users/:id should fail for invalid UUID', async () => {
    const response = await request(app.getHttpServer())
      .patch('/users/not-a-uuid')
      .send({
        firstName: 'Updated',
      })
      .expect(400);

    expect(response.body.success).toBe(false);
  });

  it('DELETE /users/:id should delete a user', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/users')
      .send({
        firstName: 'Evan',
        lastName: 'Jay',
        email: 'evan@example.com',
        age: 31,
      })
      .expect(201);

    const userId = createResponse.body.data.id;

    const response = await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(userId);
  });

  it('DELETE /users/:id should fail for invalid UUID', async () => {
    const response = await request(app.getHttpServer())
      .delete('/users/not-a-uuid')
      .expect(400);

    expect(response.body.success).toBe(false);
  });

  afterEach(async () => {
    await app.close();
  });
});