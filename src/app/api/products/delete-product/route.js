import dbConnect from "@/lib/dbConnect";
import productModel from "@/model/product-model";

export async function DELETE(request) {
  try {
    await dbConnect();


    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Product ID is required",
        }),
        { status: 400 }
      );
    }


    const deletedProduct = await productModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Product not found",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Product deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error deleting product",
      }),
      { status: 500 }
    );
  }
}
