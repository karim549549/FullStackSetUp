import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dtos/User.dto';
import * as bcrypt from 'bcrypt';
import { UserView, GetUser } from '../../utils/types/user.types';
import { User } from '@prisma/client';
@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  private UserViewSelect = {
    id: true,
    email: true,
    name: true,
    role: true,
  };

  async findUserByEmail(email: string): Promise<GetUser | null> {
    return this.prisma.user.findFirst({
      where: { email },
      select: {
        ...this.UserViewSelect,
        hashPassword: true,
      },
    });
  }
  async findUserById(id: string): Promise<GetUser | null> {
    return this.prisma.user.findFirst({
      where: { id },
      select: {
        ...this.UserViewSelect,
        hashPassword: true,
      },
    });
  }

  async createUser(data: CreateUserDto): Promise<UserView> {
    return this.prisma.user.create({
      data: {
        hashPassword: bcrypt.hashSync(data.password, 10),
        ...data,
      },
      select: this.UserViewSelect,
    });
  }

  async updateUser(id: string, data: Partial<User>): Promise<UserView> {
    return this.prisma.user.update({
      where: { id },
      data,
      select: this.UserViewSelect,
    });
  }
  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
