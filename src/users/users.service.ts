import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { NoteResponseEntity } from '../notes/entities/note-response.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseEntity } from './entities/user-response.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    page = 1,
    limit = 10,
    includeNotes = false,
  ): Promise<UserResponseEntity[]> {
    const skip = (page - 1) * limit;

    const users = await this.prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: includeNotes ? { notes: true } : undefined,
    });

    return users.map((user) => this.toUserResponse(user));
  }

  async findOne(id: string, includeNotes = false): Promise<UserResponseEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: includeNotes ? { notes: true } : undefined,
    });

    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }

    return this.toUserResponse(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseEntity> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          ...updateUserDto,
          email: updateUserDto.email?.toLowerCase(),
        },
      });

      return this.toUserResponse(updatedUser);
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id "${id}" not found`);
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  async remove(id: string): Promise<UserResponseEntity> {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: { id },
      });

      return this.toUserResponse(deletedUser);
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id "${id}" not found`);
      }

      throw error;
    }
  }

  private toUserResponse(
    user: User & { notes?: NoteResponseEntity[] },
  ): UserResponseEntity {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      notes: user.notes,
    };
  }
}