import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse as SwaggerApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponse } from '../common/interfaces/api-response.interface';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

interface AuthPayload {
  accessToken: string;
  user: unknown;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @SwaggerApiResponse({ status: 201, description: 'User registered successfully' })
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<ApiResponse<AuthPayload>> {
    const result = await this.authService.register(registerDto);

    return {
      success: true,
      message: 'User registered successfully',
      data: result,
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user and get JWT token' })
  @SwaggerApiResponse({ status: 200, description: 'Login successful' })
  async login(@Body() loginDto: LoginDto): Promise<ApiResponse<AuthPayload>> {
    const result = await this.authService.login(loginDto);

    return {
      success: true,
      message: 'Login successful',
      data: result,
    };
  }
}