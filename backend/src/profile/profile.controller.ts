import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Put,
  Req,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dtos/createProfile.dto';
import { CustomRequest } from 'src/utils/types/auth.types';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProfile(@Body() dto: CreateProfileDto, @Req() req: CustomRequest) {
    return await this.profileService.createProfile(dto, req.user.sub);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: CustomRequest) {
    return await this.profileService.getProfile(req.user.sub);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async updatedProfile(
    @Req() req: CustomRequest,
    @Body() dto: Partial<CreateProfileDto>,
  ) {
    return await this.profileService.updatedProfile(dto, req.user.sub);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async createOrUpdateProfile(
    @Req() req: CustomRequest,
    @Body() dto: CreateProfileDto,
  ) {
    console.log('Received DTO:', dto);
    return await this.profileService.createOrUpdateProfile(dto, req.user.sub);
  }
}
