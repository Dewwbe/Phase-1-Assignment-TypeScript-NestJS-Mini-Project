import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse as SwaggerApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiResponse } from '../common/interfaces/api-response.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { UserResponseEntity } from './entities/user-response.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get users with pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'includeNotes', required: false, example: false })
  @SwaggerApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
  })
  async findAll(
    @Query() query: UserQueryDto,
  ): Promise<ApiResponse<UserResponseEntity[]>> {
    const users = await this.usersService.findAll(
      query.page,
      query.limit,
      query.includeNotes,
    );

    return {
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiQuery({ name: 'includeNotes', required: false, example: false })
  async findOne(
    @Param('id') id: string,
    @Query('includeNotes') includeNotes?: string,
  ): Promise<ApiResponse<UserResponseEntity>> {
    const user = await this.usersService.findOne(id, includeNotes === 'true');

    return {
      success: true,
      message: 'User retrieved successfully',
      data: user,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user partially' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<UserResponseEntity>> {
    const updatedUser = await this.usersService.update(id, updateUserDto);

    return {
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user' })
  async remove(@Param('id') id: string): Promise<ApiResponse<UserResponseEntity>> {
    const deletedUser = await this.usersService.remove(id);

    return {
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    };
  }
}