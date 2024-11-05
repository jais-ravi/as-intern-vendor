import { z } from "zod";

export const otpForgotPassSchema = z.object({
  otp: z
    .string()
    .nonempty("OTP is required")
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must be a 6-digit number"),
});
