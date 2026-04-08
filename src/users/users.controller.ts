import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse as SwaggerApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { ApiResponse } from '../common/interfaces/api-response.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @SwaggerApiResponse({ status: 201, description: 'User created successfully' })
  create(@Body() createUserDto: CreateUserDto): ApiResponse<User> {
    const user = this.usersService.create(createUserDto);

    return {
      success: true,
      message: 'User created successfully',
      data: user,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get users with pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @SwaggerApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): ApiResponse<User[]> {
    const users = this.usersService.findAll(page, limit);

    return {
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @SwaggerApiResponse({
    status: 200,
    description: 'User retrieved successfully',
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): ApiResponse<User> {
    const user = this.usersService.findOne(id);

    return {
      success: true,
      message: 'User retrieved successfully',
      data: user,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user partially' })
  @SwaggerApiResponse({ status: 200, description: 'User updated successfully' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
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
  @ApiOperation({ summary: 'Delete a user' })
  @SwaggerApiResponse({ status: 200, description: 'User deleted successfully' })
  remove(@Param('id', new ParseUUIDPipe()) id: string): ApiResponse<User> {
    const deletedUser = this.usersService.remove(id);

    return {
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    };
  }
}
