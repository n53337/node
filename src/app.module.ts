import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
})
export class AppModule {}
