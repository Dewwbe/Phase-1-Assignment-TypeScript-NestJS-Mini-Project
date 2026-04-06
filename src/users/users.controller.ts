import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import type { ApiResponse } from '../common/interfaces/api-response.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): ApiResponse<User> {
    const user = this.usersService.create(createUserDto);

    return {
      success: true,
      message: 'User created successfully',
      data: user,
    };
  }

  @Get()
  findAll(): ApiResponse<User[]> {
    const users = this.usersService.findAll();

    return {
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): ApiResponse<User> {
    const user = this.usersService.findOne(id);

    return {
      success: true,
      message: 'User retrieved successfully',
      data: user,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): ApiResponse<User> {
    const updatedUser = this.usersService.update(id, updateUserDto);

    return {
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string): ApiResponse<User> {
    const deletedUser = this.usersService.remove(id);

    return {
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    };
  }
}