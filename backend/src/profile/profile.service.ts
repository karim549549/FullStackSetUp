import { Injectable } from '@nestjs/common';
import { ProfileRepository } from './repositories/profile.repo';
import { CreateProfileDto } from './dtos/createProfile.dto';
import { ProfileUserView } from 'src/utils/types/profile.types';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepo: ProfileRepository) {}

  async createProfile(
    dto: CreateProfileDto,
    id: string,
  ): Promise<ProfileUserView> {
    return await this.profileRepo.createProfile(dto, id);
  }

  async getProfile(id: string): Promise<ProfileUserView> {
    const profile = await this.profileRepo.getProfileByUserId(id);
    if (!profile) {
      throw new Error('Profile not found');
    }
    return profile;
  }

  async updatedProfile(
    dto: Partial<CreateProfileDto>,
    id: string,
  ): Promise<ProfileUserView> {
    const userProfile = await this.profileRepo.updateProfile(dto, id);
    if (!userProfile) {
      throw new Error('User does not have a profile');
    }
    return userProfile;
  }

  async createOrUpdateProfile(dto: CreateProfileDto, id: string): Promise<ProfileUserView> {
    const userProfile = await this.profileRepo.getProfileByUserId(id);
    if (!userProfile) {
      return await this.createProfile(dto, id);
    }
    return await this.updatedProfile(dto, id);
  }
}
