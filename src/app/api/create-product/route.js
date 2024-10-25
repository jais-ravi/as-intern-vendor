import dbConnect from "@/lib/dbConnect"; // Adjust the import according to your folder structure
import productModel from "@/model/product-model"; // Import the product model

export async function POST(request) {
  // Convert the Next.js request into FormData
  const formData = await request.formData();

  // Extract fields from FormData
  const productName = formData.get("productName");
  const productDes = formData.get("productDes");
  const productPrice = parseFloat(formData.get("productPrice")); // Ensure numeric types
  const sellingPrice = parseFloat(formData.get("sellingPrice"));
  const discount = parseFloat(formData.get("discount"));
  const size = formData.get("size");
  const freeDelivery = formData.get("freeDelivery") === 'true'; // Convert to boolean
  const deliveryCharge = parseFloat(formData.get("deliveryCharge"));
  const category = formData.get("category");
  const tags = formData.get("tags") ? formData.get("tags").split(',') : []; // Convert tags to array
  
  // Handle product images
  const images = formData.getAll("productImages"); // Get all files from FormData

  // Connect to the database
  await dbConnect();

  try {
    // Create an array to hold image data
    const imageBuffers = await Promise.all(images.map(async (file) => {
      return {
        data: Buffer.from(await file.arrayBuffer()), // Convert file data to Buffer
        contentType: file.type, // Get the content type
      };
    }));

    // Create a new product instance with image data
    const newProduct = new productModel({
      productName,
      productDes,
      productPrice,
      sellingPrice,
      discount,
      size,
      freeDelivery,
      deliveryCharge,
      category,
      tags,
      productImages: imageBuffers, // Store image data
    });

    // Save the product to MongoDB
    await newProduct.save();

    return Response.json(
      {
        success: true,
        message: "Product created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product", error);
    return Response.json(
      {
        success: false,
        message: "Error creating product",
        error: error.message // Optional: send error message to the client
      },
      { status: 500 }
    );
  }
}
