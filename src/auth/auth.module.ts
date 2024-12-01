import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { envs } from 'src/config';
import { JwtStrategy } from './strategies/jwt-strategy/jwt-strategy';
import { APP_FILTER } from '@nestjs/core';
import { JwtAuthExceptionFilter } from 'src/common/filters/jwt-auth-exception.filter';

@Module({
  imports: [
    JwtModule.register({
      // Lo voy a poner en base64
      secret: Buffer.from(envs.private_key, 'utf-8').toString('base64'),
      signOptions: {
        expiresIn: Number(envs.token_expires) || 3600,
        algorithm: 'HS512',
      },
    }),
    PassportModule,
  ],
  exports: [JwtModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: JwtAuthExceptionFilter,
    },
    JwtStrategy,
  ],
})
export class AuthModule {}
