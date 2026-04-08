import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(createUserDto: CreateUserDto): User {
    const normalizedEmail = createUserDto.email.toLowerCase();

    const existingUser = this.users.find(
      (user: User) => user.email === normalizedEmail,
    );

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const now = new Date();

    const newUser: User = {
      id: randomUUID(),
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: normalizedEmail,
      age: createUserDto.age,
      isActive: createUserDto.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    };

    this.users.push(newUser);

    return newUser;
  }

  findAll(page = 1, limit = 10): User[] {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return this.users.slice(startIndex, endIndex);
  }

  findOne(id: string): User {
    const user = this.users.find(
      (existingUser: User) => existingUser.id === id,
    );

    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const user = this.findOne(id);

    if (updateUserDto.email !== undefined) {
      const normalizedEmail = updateUserDto.email.toLowerCase();

      const emailTaken = this.users.some(
        (existingUser: User) =>
          existingUser.email === normalizedEmail && existingUser.id !== id,
      );

      if (emailTaken) {
        throw new BadRequestException('Email already exists');
      }

      updateUserDto.email = normalizedEmail;
    }

    Object.assign(user, {
      ...updateUserDto,
      updatedAt: new Date(),
    });

    return user;
  }

  remove(id: string): User {
    const user = this.findOne(id);

    const userIndex = this.users.findIndex(
      (existingUser: User) => existingUser.id === user.id,
    );

    this.users.splice(userIndex, 1);

    return user;
  }
}
