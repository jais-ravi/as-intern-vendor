import { z } from "zod";

// Validation for product name
export const productNameValidation = z
  .string()
  .min(3, "Product name must be at least 3 characters")
  .max(30, "Product name must be no more than 30 characters");

// Validation for product description
export const productDesValidation = z
  .string()
  .min(10, "Product description must be at least 10 characters")
  .max(200, "Product description must be no more than 200 characters");

// Validation for product price
export const productPriceValidation = z.coerce
  .number()
  .positive("Product price must be greater than 0");

// Validation for selling price
export const sellingPriceValidation = z.coerce
  .number()
  .positive("Selling price must be greater than 0");

// Validation for discount
export const discountValidation = z.coerce
  .number()
  .min(0, "Discount must be at least 0%")
  .max(100, "Discount cannot exceed 100%")
  .optional()
  .default(0); // Default value of 0 if not provided

// Validation for product size (preprocessing to ensure it's always an array)
export const sizeValidation = z.preprocess(
  (val) => (typeof val === "string" ? [val] : val),
  z
    .array(z.enum(["S", "M", "L", "XL"]))
    .optional()
    .default([]) // Default to empty array
);

// Validation for free delivery
export const freeDeliveryValidation = z
  .union([z.boolean(), z.string().transform((val) => val === "true")])
  .default(true); // Default to true if not provided

// Validation for delivery charge
export const deliveryChargeValidation = z.coerce
  .number()
  .nonnegative("Delivery charge must be 0 or greater");

// Validation for product images (preprocess to handle undefined and convert single file to array)
export const productImagesValidation = z
  .array(z.instanceof(File))
  .refine((files) => files.length <= 5, {
    message: "You can upload a maximum of 5 images.",
  })
  .refine((files) => files.every((file) => file.type.startsWith("image/")), {
    message: "Only image files are allowed.",
  });
// export const productImagesValidation = z.preprocess(
//   (val) => {
//     // Handle undefined and ensure we always work with an array
//     if (val === undefined) return [];
//     return Array.isArray(val) ? val : [val]; // Convert a single file into an array
//   },
//   z.array(
//     z.object({
//       originalFilename: z.string(),
//       filepath: z.string(),
//     })
//   ).refine((arr) => arr.length > 0, { message: "At least one product image is required." }) // Ensure array is not empty
// );

// Validation for category
export const categoryValidation = z.string().nonempty("Category is required");

// Validation for tags (preprocess to handle undefined or string)
export const tagsValidation = z.preprocess(
  (val) =>
    val === undefined
      ? []
      : typeof val === "string"
      ? val.split(",").map((tag) => tag.trim())
      : val,
  z.array(z.string()).optional().default([]) // Default to empty array
);

// Complete product schema
export const productSchema = z
  .object({
    productName: productNameValidation,
    productDes: productDesValidation,
    productPrice: productPriceValidation,
    sellingPrice: sellingPriceValidation,
    discount: discountValidation,
    size: sizeValidation,
    freeDelivery: freeDeliveryValidation,
    deliveryCharge: deliveryChargeValidation,
    productImages: z
      .array(z.instanceof(File))
      .refine((files) => files.length <= 5, {
        message: "You can upload a maximum of 5 images.",
      }),
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
