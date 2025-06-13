export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  id: string;
  email: string;
  role: Role;
  isEmailConfirmed: boolean;
  name: string;
  deletedAt: string;
}
export type StoredUser = Pick<User, "id" | "email" | "role" | "name">;
