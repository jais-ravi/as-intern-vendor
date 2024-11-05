import dbConnect from "@/lib/dbConnect";
import productModel from "@/model/product-model";
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
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json", 
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server Error" }),
      { status: 500 }
    );
  }
}
