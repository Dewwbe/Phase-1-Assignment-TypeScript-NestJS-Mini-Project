import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import type { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(createUserDto: CreateUserDto): User {
    const existingUser = this.users.find(
      (user: User) => user.email === createUserDto.email,
    );

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const now = new Date();

    const newUser: User = {
      id: randomUUID(),
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
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
}