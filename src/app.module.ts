import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { ResourcesModule } from './resources/resources.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ResourcesModule, CommonModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
