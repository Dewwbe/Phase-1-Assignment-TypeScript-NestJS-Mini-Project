import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;

  const prismaMock = {
    note: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  } as unknown as PrismaService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new NotesService(prismaMock);
  });

  it('should create a note', async () => {
    jest.spyOn(prismaMock.note, 'create').mockResolvedValue({
      id: '1',
      title: 'Test',
      content: 'Test content',
      userId: 'user-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.create(
      { title: 'Test', content: 'Test content' },
      { userId: 'user-1', email: 'john@example.com' },
    );

    expect(result.title).toBe('Test');
  });

  it('should throw when note not found', async () => {
    jest.spyOn(prismaMock.note, 'findUnique').mockResolvedValue(null);

    await expect(service.findOne('missing')).rejects.toThrow(NotFoundException);
  });
});