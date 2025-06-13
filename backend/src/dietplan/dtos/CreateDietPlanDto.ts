import { IsString, IsNumber, IsBoolean, IsArray, IsOptional, IsEnum, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { GOAL, CUISINE } from '@prisma/client';
import { CreateProfileDto } from '../../profile/dtos/createProfile.dto';

class CuisineDto {
  @IsString()
  @IsEnum(CUISINE)
  name: CUISINE;

  @IsNumber()
  @Min(0)
  @Max(100)
  percentage: number;
}

export class CreateDietPlanDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(GOAL)
  goal: GOAL;

  @IsBoolean()
  includeSnacks: boolean;

  @IsNumber()
  @Min(1)
  @Max(52)
  durationInWeeks: number;

  @IsNumber()
  @Min(1)
  @Max(6)
  mealPerDay: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CuisineDto)
  cuisine: CuisineDto[];

  @IsBoolean()
  useProfile: boolean;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile: CreateProfileDto;
}
