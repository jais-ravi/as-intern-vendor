const dbConnect = require("@/lib/dbConnect");
const productModel = require("@/model/product-model");

export async function GET(req) {
  await dbConnect();
  try {
    const vendorId = req.nextUrl.searchParams.get("vendorId");
    if (!vendorId) {
      return new Response(
        JSON.stringify({ success: false, message: "Vendor ID is required" }),
        { status: 400 }
      );
    }
    const products = await productModel.find({ vendorId });
    const productLength = products.length;
    return new Response(JSON.stringify({ success: true, count: productLength }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return new Response(
      JSON.stringify({ success: false, message: "Server Error" }),
      { status: 500 }
    );
  }
}
