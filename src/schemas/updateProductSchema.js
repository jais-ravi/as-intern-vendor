import { z } from "zod";

export const productNameValidation = z
  .string()
  .min(3, "Product name must be at least 3 characters")
  .max(30, "Product name must be no more than 30 characters");

export const productDesValidation = z
  .string()
  .min(10, "Product description must be at least 10 characters")
  .max(200, "Product description must be no more than 200 characters");

export const productPriceValidation = z.coerce
  .number()
  .positive("Product price must be greater than 0");

export const sellingPriceValidation = z.coerce
  .number()
  .positive("Selling price must be greater than 0");

export const discountValidation = z.coerce
  .number()
  .min(0, "Discount must be at least 0%")
  .max(100, "Discount cannot exceed 100%")
  .optional()
  .default(0);

export const productBrandValidation = z
  .string()
  .min(3, "Product name must be at least 3 characters")
  .max(30, "Product name must be no more than 30 characters");

export const freeDeliveryValidation = z
  .union([z.boolean(), z.string().transform((val) => val === "true")])
  .default(true);

export const deliveryChargeValidation = z.coerce
  .number()
  .nonnegative("Delivery charge must be 0 or greater");

export const productImagesValidation = z.object({
  productImages: z
    .array(z.any()) // Accept an array of files
    .max(5, { message: "You can only upload up to 5 images." })
    .refine(
      (files) =>
        files.every(
          (file) => file.size <= 5 * 1024 * 1024 // Check file size (5MB limit)
        ),
      { message: "Each file must be less than 5MB." }
    ),
});

export const categoryValidation = z.string().nonempty("Category is required");

export const tagsValidation = z.preprocess(
  (val) =>
    val === undefined
      ? []
      : typeof val === "string"
      ? val.split(",").map((tag) => tag.trim())
      : val,
  z.array(z.string()).optional().default([])
);

export const updateProductSchema = z
  .object({
    productName: productNameValidation,
    productDes: productDesValidation,
    productPrice: productPriceValidation,
    sellingPrice: sellingPriceValidation,
    discount: discountValidation,
    productBrand: productBrandValidation,
    freeDelivery: freeDeliveryValidation,
    deliveryCharge: deliveryChargeValidation,
    // productImages: z
    //   .array(z.instanceof(File))
    //   .refine((files) => files.length >= 1 && files.length <= 5, {
    //     message: "You can upload a minimum of 1 and a maximum of 5 images.",
    //   }),
    category: categoryValidation,
    tags: tagsValidation,
  })
  .superRefine((data, ctx) => {
    if (data.sellingPrice > data.productPrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selling price cannot be higher than the product price",
        path: ["sellingPrice"],
      });
    }
    if (
      !data.freeDelivery &&
      (!data.deliveryCharge || data.deliveryCharge <= 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Please enter a valid delivery charge if free delivery is disabled",
        path: ["deliveryCharge"],
      });
    }
  });
