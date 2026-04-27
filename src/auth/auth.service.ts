import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UserResponseEntity } from '../users/entities/user-response.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

interface AuthResponse {
  accessToken: string;
  user: UserResponseEntity;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const normalizedEmail = registerDto.email.toLowerCase();

    try {
      const user = await this.prisma.user.create({
        data: {
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
          email: normalizedEmail,
          password: hashedPassword,
          age: registerDto.age,
          isActive: registerDto.isActive ?? true,
        },
      });

      return {
        accessToken: await this.signToken(user),
        user: this.toUserResponse(user),
      };
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const normalizedEmail = loginDto.email.toLowerCase();

    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: await this.signToken(user),
      user: this.toUserResponse(user),
    };
  }

  private async signToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const secret = this.configService.get<string>('JWT_SECRET');
    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN') ?? '1d';

    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn: expiresIn as `${number}${'s' | 'm' | 'h' | 'd'}` | number,
    });
  }

  private toUserResponse(user: User): UserResponseEntity {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}