import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

export const cookieBuilder = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  configService: ConfigService,
) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: configService.get<string>('NODE_ENV') === 'production',
    sameSite: 'strict',
  });

  const refreshTokenMaxAge =
    Number(configService.get('JWT_REFRESH_EXPIRATION_Cookie')) ||
    1000 * 60 * 60 * 24 * 7; // default to 7 days if not set

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: configService.get<string>('NODE_ENV') === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: refreshTokenMaxAge,
  });
};
