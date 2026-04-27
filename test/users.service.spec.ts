import { ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { UsersService } from '../src/users/users.service';

describe('UsersService', () => {
  let service: UsersService;

  const prismaMock = {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  } as unknown as PrismaService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UsersService(prismaMock);
  });

  it('should return users', async () => {
    jest.spyOn(prismaMock.user, 'findMany').mockResolvedValue([
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'hashed',
        age: 25,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const result = await service.findAll();

    expect(result).toHaveLength(1);
    expect(result[0].email).toBe('john@example.com');
  });

  it('should throw when user not found', async () => {
    jest.spyOn(prismaMock.user, 'findUnique').mockResolvedValue(null);

    await expect(service.findOne('missing-id')).rejects.toThrow(NotFoundException);
  });

  it('should update a user', async () => {
    jest.spyOn(prismaMock.user, 'update').mockResolvedValue({
      id: '1',
      firstName: 'Updated',
      lastName: 'Doe',
      email: 'updated@example.com',
      password: 'hashed',
      age: 30,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.update('1', {
      firstName: 'Updated',
      email: 'UPDATED@example.com',
    });

    expect(result.firstName).toBe('Updated');
    expect(result.email).toBe('updated@example.com');
  });

  it('should delete a user', async () => {
    jest.spyOn(prismaMock.user, 'delete').mockResolvedValue({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'hashed',
      age: 25,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.remove('1');

    expect(result.id).toBe('1');
  });
});