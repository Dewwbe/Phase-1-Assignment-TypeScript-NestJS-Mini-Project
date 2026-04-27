import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let accessToken = '';
  let createdUserId = '';
  let createdNoteId = '';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = app.get(PrismaService);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.init();

    await prisma.note.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.note.deleteMany();
    await prisma.user.deleteMany();
    await app.close();
  });

  it('should register a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'StrongPassword123',
        age: 25,
      })
      .expect(201);

    accessToken = response.body.data.accessToken;
    createdUserId = response.body.data.user.id;

    expect(response.body.success).toBe(true);
  });

  it('should reject duplicate email', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'StrongPassword123',
        age: 25,
      })
      .expect(409);
  });

  it('should login', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'john@example.com',
        password: 'StrongPassword123',
      })
      .expect(200);

    expect(response.body.data.accessToken).toBeDefined();
  });

  it('should block protected route without token', async () => {
    await request(app.getHttpServer())
      .patch(`/users/${createdUserId}`)
      .send({ firstName: 'Updated' })
      .expect(401);
  });

  it('should update protected route with token', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/users/${createdUserId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ firstName: 'Updated' })
      .expect(200);

    expect(response.body.data.firstName).toBe('Updated');
  });

  it('should create a note', async () => {
    const response = await request(app.getHttpServer())
      .post('/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'My note',
        content: 'This is a note',
      })
      .expect(201);

    createdNoteId = response.body.data.id;
    expect(response.body.data.title).toBe('My note');
  });

  it('should get notes by user', async () => {
    const response = await request(app.getHttpServer())
      .get(`/notes/user/${createdUserId}`)
      .expect(200);

    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should get user with notes', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${createdUserId}?includeNotes=true`)
      .expect(200);

    expect(Array.isArray(response.body.data.notes)).toBe(true);
  });

  it('should update note', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/notes/${createdNoteId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Updated note',
      })
      .expect(200);

    expect(response.body.data.title).toBe('Updated note');
  });

  it('should delete note', async () => {
    await request(app.getHttpServer())
      .delete(`/notes/${createdNoteId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });
});