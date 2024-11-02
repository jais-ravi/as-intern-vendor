// src/app/api/get-products/route.js
import dbConnect from "@/lib/dbConnect";
import productModel from "@/model/product-model";

// Named export for the GET method
export async function GET(req) {
  await dbConnect(); // Ensure database connection

  try {
    // Access vendorId using req.nextUrl
    const vendorId = req.nextUrl.searchParams.get("vendorId");
    // const url = new URL(req.url);

  // Extract the vendorId from the query parameters
//   const vendorId = url.searchParams.get("vendorId");
//   const {vendorId} = await req.json();

    // Validate vendorId
    if (!vendorId) {
      return new Response(
        JSON.stringify({ success: false, message: "Vendor ID is required" }),
        { status: 400 }
      );
    }

    // Fetch products from the database for the specific vendor
    const products = await productModel.find({ vendorId });

    // Return products in the response
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json", // Ensure the response type is JSON
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
