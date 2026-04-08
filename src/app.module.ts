import { Controller, Get, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    }),
    UsersModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
