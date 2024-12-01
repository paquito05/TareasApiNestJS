import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptService } from 'src/common/service/bcrypt/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { envs } from 'src/config';

@Module({
  imports: [
    JwtModule.register({
      secret: Buffer.from(envs.private_key, 'utf-8').toString('base64'),
      signOptions: {
        expiresIn: Number(envs.token_expires) || 3600,
        algorithm: 'HS512', 
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, PrismaService],
})
export class AuthModule {}
