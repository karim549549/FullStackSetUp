import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repo';
import { CreateUserDto } from './dtos/User.dto';
import { UserView, GetUser } from '../utils/types/user.types';
import { User } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async getUserById(id: string): Promise<GetUser | null> {
    return await this.userRepo.findUserById(id);
  }

  async getUserByEmail(email: string): Promise<GetUser | null> {
    return await this.userRepo.findUserByEmail(email);
  }

  async createUser(dto: CreateUserDto): Promise<UserView> {
    return await this.userRepo.createUser(dto);
  }
  async updateUser(id: string, data: Partial<User>): Promise<UserView> {
    return await this.userRepo.updateUser(id, data);
  }

  async deleteUser(id: string): Promise<void> {
    return await this.userRepo.deleteUser(id);
  }
}
