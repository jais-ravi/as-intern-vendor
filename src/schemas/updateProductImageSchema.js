import { z } from "zod";

export const ImagesValidation = z.object({
  productImages: z
    .array(z.any()) // Accept an array of files
    .min(1,{message:"Atleast one Image is required"})
    .max(5, { message: "You can only upload up to 5 images." })
    .refine(
      (files) =>
        files.every(
          (file) =>
            file.size <= 5 * 1024 * 1024 // Check file size (5MB limit)
        ),
      { message: "Each file must be less than 5MB." }
    ),
});
