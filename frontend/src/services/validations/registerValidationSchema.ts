import { z } from "zod";

import { LoginValidationSchema } from "./loginValidationSchema";

export const RegisterValidationSchema = LoginValidationSchema.extend({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterFormType = z.infer<typeof RegisterValidationSchema>;
