import { ROLE } from '@prisma/client';
import { Request, request } from 'express';

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
};
export enum TokenType {
  ACCESS,
  REFRESH,
  RESET_PASSWORD,
  VERIFY_EMAIL,
}
export type TokenPayload = {
  sub: string;
  email: string;
  role: ROLE;
};
export type CustomRequest = Request & {
  user: TokenPayload;
};