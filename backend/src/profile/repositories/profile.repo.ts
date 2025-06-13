import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProfileDto } from '../dtos/createProfile.dto';
import { ProfileUserView } from 'src/utils/types/profile.types';
import { GENDER, ACTIVITY_LEVEL, MEDICATION, FOOD_INTOLERANCE } from '@prisma/client';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}
  private profileView = {
    height: true,
    weight: true,
    birthdate: true,
    activityLevel: true,
    gender: true,

    smoke: true,
    medications: true,
    foodIntolerances: true,
    
    vegetarian: true,
    vegan: true,
    halal: true,
    kosher: true,
  };

  private transformProfileData(dto: CreateProfileDto) {
    return {
      ...dto,
      birthdate: new Date(dto.birthdate),
      gender: dto.gender as GENDER,
      activityLevel: dto.activityLevel as ACTIVITY_LEVEL,
      medications: dto.medications?.map(med => med as MEDICATION) || [],
      foodIntolerances: dto.foodIntolerances?.map(int => int as FOOD_INTOLERANCE) || [],
    };
  }

  async createProfile(
    profile: CreateProfileDto,
    userId: string,
  ): Promise<ProfileUserView> {
    const transformedData = this.transformProfileData(profile);
    return await this.prisma.profile.create({
      data: {
        userId,
        ...transformedData,
      },
      select: this.profileView,
    });
  }

  async getProfileByUserId(userId: string): Promise<ProfileUserView | null> {
    return await this.prisma.profile.findUnique({
      where: { userId },
      select: this.profileView,
    });
  }

  async updateProfile(
    dto: Partial<CreateProfileDto>,
    userId: string,
  ): Promise<ProfileUserView> {
    const transformedData = dto.birthdate ? this.transformProfileData(dto as CreateProfileDto) : {
      ...dto,
      gender: dto.gender as GENDER | undefined,
      activityLevel: dto.activityLevel as ACTIVITY_LEVEL | undefined,
      medications: dto.medications?.map(med => med as MEDICATION),
      foodIntolerances: dto.foodIntolerances?.map(int => int as FOOD_INTOLERANCE),
    };
    
    return await this.prisma.profile.update({
      where: { userId },
      data: transformedData,
      select: this.profileView,
    });
  }

  async upsertProfile(dto: CreateProfileDto, userId: string): Promise<ProfileUserView> {
    const transformedData = this.transformProfileData(dto);
    
    return await this.prisma.profile.upsert({
      where: { userId },
      update: transformedData,
      create: {
        ...transformedData,
        userId,
      },
      select: this.profileView,
    });
  }
}
