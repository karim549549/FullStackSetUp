import {
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  IsIn,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { MEAL_TYPE } from '@prisma/client';

export class RecipeFilter {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  serving?: number;

  @IsOptional()
  @IsString()
  cuisine?: string;

  @IsOptional()
  @IsEnum(MEAL_TYPE)
  @Transform(({ value }) => value?.toUpperCase())
  mealType?: MEAL_TYPE;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  page?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  limit?: number;
}
