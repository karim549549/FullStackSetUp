import { User } from '@prisma/client';

export type UserView = Pick<User, 'id' | 'email' | 'name' | 'role'>;

export type GetUser = Pick<
  User,
  'id' | 'email' | 'name' | 'role' | 'hashPassword'
>;
