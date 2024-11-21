import dbConnect from "@/lib/dbConnect";
import productModel from "@/model/product-model";

export async function PATCH(request) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const productId = url.searchParams.get("productId");

    if (!productId) {
      return new Response(
        JSON.stringify({ success: false, message: "Product ID is required" }),
        { status: 400 }
      );
    }

    const formData = await request.formData();
    
    const productName = formData.get("productName");
    const productDes = formData.get("productDes");
    const productPrice = parseFloat(formData.get("productPrice"));
    const sellingPrice = parseFloat(formData.get("sellingPrice"));
    const discount = parseFloat(formData.get("discount"));
    const productBrand = formData.get("productBrand");
    const category = formData.get("category");
    const tags = formData.get("tags");
    const freeDelivery = formData.get("freeDelivery") === "true"; 
    const deliveryCharge = freeDelivery ? 0 : parseFloat(formData.get("deliveryCharge"));


    const updatedProduct = await productModel.findOneAndUpdate(
      { _id: productId }, 
      {
        productName,
        productDes,
        productPrice,
        sellingPrice,
        discount,
        productBrand,
        category,
        tags,
        freeDelivery,
        deliveryCharge,
      }, 
      { new: true } 
    );

    if (!updatedProduct) {
      return new Response(
        JSON.stringify({ success: false, message: "Product not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Product updated successfully", product: updatedProduct }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in update product:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server Error" }),
      { status: 500 }
    );
  }
}
