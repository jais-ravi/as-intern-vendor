import { z } from "zod";

export const firstNameValidation = z
  .string()
  .min(3, "First name must be atleast 3 character")
  .max(20, "First name must be no more than 20 character")
  .regex(/^[A-Za-z\s]+$/, "First name must not contain special character");
export const lastNameValidation = z
  .string()
  .min(2, "Last name must be atleast 2 character")
  .max(20, "Last name must be no more than 20 character")
  .regex(/^[A-Za-z\s]+$/, "Last name must not contain special character");
export const phoneValidation = z
  .string()
  .regex(/^\d{10}$/, { message: "Contact number must be exactly 10 digits" });

export const signUpSchema = z.object({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  contactNumber: phoneValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
