import dbConnect from "@/lib/dbConnect";
import productModel from "@/model/product-model";

export async function PUT(request) {
  const formData = await request.formData();
  const productId = formData.get("productId"); 
  const images = formData.getAll("productImages"); 
  await dbConnect();
  try {
    const imageBuffers = await Promise.all(
      images.map(async (file) => {
        const fileSize = file.size;
        const maxSize = 5 * 1024 * 1024; 
        if (fileSize > maxSize) {
          throw new Error("File size exceeds the 5MB limit.");
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
          throw new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed.");
        }


        return {
          data: Buffer.from(await file.arrayBuffer()),
          contentType: file.type,
        };
      })
    );

    const product = await productModel.findById(productId);

    if (!product) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Product not found.",
        }),
        { status: 404 }
      );
    }

    product.productImages = imageBuffers;

    await product.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Product images updated successfully.",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product images", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Error updating product images.",
      }),
      { status: 500 }
    );
  }
}
