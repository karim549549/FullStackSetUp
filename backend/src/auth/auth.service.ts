import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserView } from '../utils/types/user.types';
import { UserService } from '../user/user.service';
import { TokenFactory } from 'src/services/factories/token.factory';
import { EmailService } from 'src/email/email.service';
import { CreateUserDto, LoginUserDto } from 'src/user/dtos/User.dto';
import {
  AuthResponse,
  TokenPayload,
  TokenType,
} from 'src/utils/types/auth.types';
import { ResetPasswordDto } from './dtos/auth.dto';
import { Subject } from 'rxjs';
import { EMAILNAME } from 'src/utils/types/email.types';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Payload } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenFactory: TokenFactory,
    private readonly emailService: EmailService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async login(dto: LoginUserDto): Promise<AuthResponse> {
    const user = await this.userService.getUserByEmail(dto.email);

    if (!user || !(await bcrypt.compare(dto.password, user.hashPassword))) {
      throw new Error('User not found');
    }

    return this.buildAuthResponse(user);
  }

  async register(dto: CreateUserDto): Promise<AuthResponse> {
    const foundedUser = await this.userService.getUserByEmail(dto.email);

    if (foundedUser) {
      throw new Error('User already exists');
    }

    const user = await this.userService.createUser(dto);
    const isEmailSent = await this.emailService.sendWelcomeEmail(
      user.name,
      user.email,
    );
    if (!isEmailSent) {
      console.log('Email not sent');
    }
    return this.buildAuthResponse(user);
  }

  async refresh(payload: TokenPayload): Promise<AuthResponse> {
    const user = await this.userService.getUserById(payload.sub);

    if (!user) {
      throw new Error('User not found');
    }

    return this.buildAuthResponse({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });
  }

  async sendVerificationEmail(email: string): Promise<boolean> {
    return await this.emailService.sendVerificationEmail(email);
  }
  async sendForgetPasswordEmail(dto: { email: string }): Promise<boolean> {
    return await this.emailService.sendForgetPasswordEmail(dto.email);
  }

  async resetPassword(dto: ResetPasswordDto): Promise<AuthResponse> {
    await this.validateCode(`reset: ${dto.email}`, dto.code);

    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const updatedUser = await this.userService.updateUser(user.id, {
      hashPassword: bcrypt.hashSync(dto.password, 10),
    });
    await this.cacheManager.del(`verify: ${dto.email}`);
    return this.buildAuthResponse(updatedUser);
  }

  async verifyEmail(code: string, payload: TokenPayload): Promise<boolean> {
    await this.validateCode(`verify: ${payload.email}`, code);

    const user = await this.userService.getUserByEmail(payload.email);
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const updatedUser = await this.userService.updateUser(user.id, {
      isEmailVerified: true,
    });
    await this.cacheManager.del(`verify: ${payload.email}`);
    return true;
  }

  private async buildAuthResponse(user: UserView): Promise<AuthResponse> {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.tokenFactory.createToken(
      TokenType.ACCESS,
      payload,
    );

    const refreshToken = await this.tokenFactory.createToken(
      TokenType.REFRESH,
      payload,
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    };
  }
  private async validateCode(key: string, code: string): Promise<void> {
    const cachedCode = await this.cacheManager.get(key);
    if (!cachedCode || cachedCode !== code) {
      throw new Error('Invalid code');
    }
  }
}
