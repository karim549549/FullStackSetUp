import {
  ACTIVITY_LEVEL,
  FOOD_INTOLERANCE, // This seems to be a typo, likely should be FOOD_INTOLERANCE
  GENDER,
  MEDICATION,
} from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsBoolean, // Added IsBoolean for boolean types
  IsArray, // Added IsArray for array types
  IsDate,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birthdate: Date;

  @IsNotEmpty()
  @IsEnum(GENDER)
  gender: GENDER;

  @IsNotEmpty()
  @IsEnum(ACTIVITY_LEVEL)
  activityLevel: ACTIVITY_LEVEL;

  // ---

  // FIX: Typo in 'FOOD_INROLERANCE' - assuming it should be FOOD_INTOLERANCE
  // If 'foodInrolerance' was intended to be a single intolerance, keep as IsEnum.
  // If it's meant to be a list of intolerances, then it should be an array like 'intolerances' below.
  // For now, I've kept it as a single enum, assuming 'intolerances' handles the array.

  @IsNotEmpty()
  @IsArray() // Medications can be multiple, so it should be an array
  @IsEnum(MEDICATION, { each: true }) // 'each: true' validates each item in the array
  @IsOptional()
  medications: MEDICATION[];

  @IsNotEmpty()
  @IsBoolean() // Added IsBoolean for boolean validation
  @IsOptional()
  smoker: boolean;

  @IsNotEmpty()
  @IsArray() // Intolerances can be multiple, so it should be an array
  @IsEnum(FOOD_INTOLERANCE, { each: true }) // 'each: true' validates each item in the array
  @IsOptional()
  foodIntolerances: FOOD_INTOLERANCE[];

  // ---

  @IsBoolean() // Added IsBoolean for boolean validation
  @IsOptional()
  vegetarian: boolean;

  @IsBoolean() // Added IsBoolean for boolean validation
  @IsOptional()
  vegan: boolean;

  @IsBoolean() // Added IsBoolean for boolean validation
  @IsOptional()
  halal: boolean;

  @IsBoolean() // Added IsBoolean for boolean validation
  @IsOptional()
  kosher: boolean;
}
