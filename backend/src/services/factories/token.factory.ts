import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ROLE } from '@prisma/client';
import { TokenPayload, TokenType } from 'src/utils/types/auth.types';

@Injectable()
export class TokenFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(type: TokenType, payload: string | TokenPayload) {
    const { secret, expiresIn } = this.getTokenExpirationAndSecret(type);
    const token = this.jwtService.sign({ payload }, { secret, expiresIn });
    return token;
  }

  async verifyToken(token: string, type: TokenType) {
    const { secret } = this.getTokenExpirationAndSecret(type);
    try {
      const decoded = this.jwtService.verify(token, { secret });
      return decoded;
    } catch (error) {
      return null;
    }
  }

  private getTokenExpirationAndSecret(type: TokenType): {
    secret: string;
    expiresIn: string;
  } {
    let secret: string | undefined;
    let expiresIn: string | undefined;

    switch (type) {
      case TokenType.ACCESS:
        secret = this.configService.get<string>('JWT_ACCESS_SECRET');
        expiresIn = this.configService.get<string>('JWT_ACCESS_EXPIRATION');
        break;
      case TokenType.REFRESH:
        secret = this.configService.get<string>('JWT_REFRESH_SECRET');
        expiresIn = this.configService.get<string>('JWT_REFRESH_EXPIRATION');
        break;
      case TokenType.RESET_PASSWORD:
        secret = this.configService.get<string>('JWT_RESET_PASSWORD_SECRET');
        expiresIn = this.configService.get<string>(
          'JWT_RESET_PASSWORD_EXPIRATION',
        );
        break;
      case TokenType.VERIFY_EMAIL:
        secret = this.configService.get<string>('JWT_VERIFY_EMAIL_SECRET');
        expiresIn = this.configService.get<string>(
          'JWT_VERIFY_EMAIL_EXPIRATION',
        );
        break;
      default:
        throw new Error('Invalid token type');
    }

    if (!secret || !expiresIn) {
      throw new Error(
        'Configuration error: JWT secret or expiration not defined',
      );
    }

    return { secret, expiresIn };
  }
}
