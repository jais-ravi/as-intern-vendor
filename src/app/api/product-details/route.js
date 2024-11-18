const dbConnect = require("@/lib/dbConnect");
const productModel = require("@/model/product-model");

export async function GET(request) {
  try {
    await dbConnect();

    // Extract productId from query string
    const url = new URL(request.url);
    const productId = url.searchParams.get("productId");

    if (!productId) {
      return new Response(
        JSON.stringify({ success: false, message: "Product ID is required" }),
        { status: 400 }
      );
    }

    // Fetch the product data
    const product = await productModel.findById(productId);
    if (!product) {
      return new Response(
        JSON.stringify({ success: false, message: "Product not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true, data: product }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server Error" }), 
      { status: 500 }
    );
  }
}
