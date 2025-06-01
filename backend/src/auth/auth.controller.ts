import {
  Controller,
  HttpStatus,
  Post,
  HttpCode,
  Get,
  Body,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../user/dtos/User.dto';
import { ResetPasswordDto } from './dtos/auth.dto';
import { cookieBuilder } from './cookieBuilder';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { CustomRequest, TokenPayload } from 'src/utils/types/auth.types';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtRefreshGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.login(dto);
    cookieBuilder(res, accessToken, refreshToken, this.configService);
    return user;
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async Register(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, accessToken, refreshToken } =
      await this.authService.register(dto);
    cookieBuilder(res, accessToken, refreshToken, this.configService);
    return user;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async me(@Req() req: CustomRequest) {
    return req.user;
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @Req() req: CustomRequest,
  ) {
    const payload = req.user;
    const { accessToken, refreshToken } =
      await this.authService.refresh(payload);
    cookieBuilder(res, accessToken, refreshToken, this.configService);
    return { accessToken, refreshToken };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const result = await this.authService.resetPassword(dto);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: { email: string }) {
    return await this.authService.sendForgetPasswordEmail(dto);
  }

  @Post('send-verification-email')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async sendVerificationEmail(@Body() dto: { email: string }) {
    return await this.authService.sendVerificationEmail(dto.email);
  }

  @Get('verify-email')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Req() req: CustomRequest, @Body() code: string) {
    return await this.authService.verifyEmail(code, req.user);
  }
}
