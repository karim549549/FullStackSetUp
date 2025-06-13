import { GENDER, ACTIVITY_LEVEL, MEDICATION, FOOD_INTOLERANCE } from '@prisma/client';

export interface ProfileUserView {
  height: number;
  weight: number;
  birthdate: Date;
  activityLevel: ACTIVITY_LEVEL;
  gender: GENDER;
  medications: MEDICATION[];
  smoke: boolean;
  foodIntolerances: FOOD_INTOLERANCE[];
  vegetarian: boolean;
  vegan: boolean;
  halal: boolean;
  kosher: boolean;
}
