// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/refresh.strategy';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtRefreshGuard } from './guards/refresh.guard';
import { TokenFactory } from 'src/services/factories/token.factory';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/repositories/user.repo';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const accessSecret = config.get<string>('JWT_ACCESS_SECRET');
        const accessExpiry = config.get<string>('JWT_ACCESS_EXPIRATION');
        if (!accessSecret || !accessExpiry) {
          throw new Error(
            'Missing JWT_ACCESS_SECRET or JWT_ACCESS_EXPIRATION in .env',
          );
        }
        return {
          secret: accessSecret,
          signOptions: {
            expiresIn: accessExpiry,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenFactory,
    JwtStrategy,
    JwtAuthGuard,
    JwtRefreshStrategy,
    JwtRefreshGuard,
  ],
})
export class AuthModule {}
