import { z } from "zod";
export const emailForgotPassSchema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
  });
  