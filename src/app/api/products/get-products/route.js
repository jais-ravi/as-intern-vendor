import dbConnect from "@/lib/dbConnect";
import productModel from "@/model/product-model";

export async function GET(req) {
  dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const vendorId = searchParams.get("vendorId");

    if (!vendorId) {
      return new Response(
        JSON.stringify({ success: false, message: "Vendor ID is required" }),
        { status: 400 }
      );
    }


    const products = await productModel.find({ vendorId });
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server Error" }),
      { status: 500 }
    );
  }
}
