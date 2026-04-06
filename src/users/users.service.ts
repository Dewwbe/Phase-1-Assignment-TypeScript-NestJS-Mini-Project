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
    const existingUser = this.users.find(
      (user: User) => user.email.toLowerCase() === createUserDto.email.toLowerCase(),
    );

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const now = new Date();

    const newUser: User = {
      id: randomUUID(),
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email.toLowerCase(),
      age: createUserDto.age,
      isActive: createUserDto.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    };

    this.users.push(newUser);

    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((existingUser: User) => existingUser.id === id);

    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const user = this.findOne(id);

    if (
      updateUserDto.email !== undefined &&
      this.users.some(
        (existingUser: User) =>
          existingUser.email.toLowerCase() === updateUserDto.email!.toLowerCase() &&
          existingUser.id !== id,
      )
    ) {
      throw new BadRequestException('Email already exists');
    }

    if (updateUserDto.firstName !== undefined) {
      user.firstName = updateUserDto.firstName;
    }

    if (updateUserDto.lastName !== undefined) {
      user.lastName = updateUserDto.lastName;
    }

    if (updateUserDto.email !== undefined) {
      user.email = updateUserDto.email.toLowerCase();
    }

    if (updateUserDto.age !== undefined) {
      user.age = updateUserDto.age;
    }

    if (updateUserDto.isActive !== undefined) {
      user.isActive = updateUserDto.isActive;
    }

    user.updatedAt = new Date();

    return user;
  }

  remove(id: string): User {
    const userIndex = this.users.findIndex(
      (existingUser: User) => existingUser.id === id,
    );

    if (userIndex === -1) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }

    const [deletedUser] = this.users.splice(userIndex, 1);
    return deletedUser;
  }
}