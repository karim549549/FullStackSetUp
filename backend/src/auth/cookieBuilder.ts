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
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: configService.get<string>('NODE_ENV') === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: configService.get<number>('JWT_REFRESH_EXPIRATION_Cookie'),
  });
};
