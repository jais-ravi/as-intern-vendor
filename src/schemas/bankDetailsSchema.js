import { z } from "zod";

// Define the Zod schema for bank details form
const bankDetailsSchema = z.object({
  accountNumber: z
    .string()
    .min(5, { message: "Account number must be at least 5 characters long" })
    .max(35, { message: "Account number can have a maximum of 35 characters" })
    .regex(/^[a-zA-Z0-9]+$/, { message: "Account number can only contain letters and numbers" }),

  ifsc: z
    .string()
    .length(11, { message: "IFSC code must be exactly 11 characters long" })
    .regex(/^[a-zA-Z0-9]+$/, { message: "IFSC code is invalid" }),

  accountHolderName: z
    .string()
    .min(3, { message: "Account holder's name must have at least 3 characters" })
    .max(120, { message: "Account holder's name can have a maximum of 120 characters" })
    .regex(
      /^[a-zA-Z0-9\s’,\-_\/()]*[a-zA-Z0-9\s’,\-_\/()]+$/,
      { message: "Account holder's name cannot end with a special character except ' , - , _ , / , ( , )" }
    )
    .regex(
      /^[a-zA-Z0-9\s’,\-_\/()]+$/,
      { message: "Account holder's name can only contain letters, numbers, spaces, and the following special characters: ’ , - , _ , / , ( , )" }
    ),
});

export default bankDetailsSchema;
