import { z } from "zod";
import { GENDER, ACTIVITY_LEVEL, MEDICATION, FOOD_INTOLERANCE } from "@/lib/types/profile.types";

export const profileValidationSchema = z.object({
  weight: z.number().min(30).max(300),
  height: z.number().min(100).max(250),
  birthdate: z.string(),
  gender: z.nativeEnum(GENDER),
  activityLevel: z.nativeEnum(ACTIVITY_LEVEL),
  medications: z.array(z.nativeEnum(MEDICATION)).default([]),
  foodIntolerances: z.array(z.nativeEnum(FOOD_INTOLERANCE)).default([]),
  smoke: z.boolean().default(false),
  vegetarian: z.boolean().default(false),
  vegan: z.boolean().default(false),
  halal: z.boolean().default(false),
  kosher: z.boolean().default(false),
});

export type ProfileFormType = z.infer<typeof profileValidationSchema>; 