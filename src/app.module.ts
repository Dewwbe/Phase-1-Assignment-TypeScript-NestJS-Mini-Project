import { Controller, Get, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { envValidationSchema } from './config/env.validation';
import { NotesModule } from './notes/notes.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Controller()
class HealthController {
  @Get()
  getRoot(): { message: string } {
    return { message: 'User Management API is running' };
  }

  @Get('health')
  getHealth(): { status: string } {
    return { status: 'ok' };
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    NotesModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}