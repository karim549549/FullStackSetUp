import { z } from "zod";

export const VerificationCodeValidationSchema = z.object({
  verificationCode: z.string().min(6).max(6),
});

export type VerificationCodeFormType = z.infer<
  typeof VerificationCodeValidationSchema
>;
