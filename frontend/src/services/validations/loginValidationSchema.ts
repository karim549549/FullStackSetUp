import { z } from "zod";

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const EmailValidationSchema = z.object({
  email: z.string().email(),
});

export const LoginValidationSchema = EmailValidationSchema.extend({
  password: z.string().min(8).regex(passwordRegex, {
    message:
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  }),
});

export type LoginFormType = z.infer<typeof LoginValidationSchema>;
