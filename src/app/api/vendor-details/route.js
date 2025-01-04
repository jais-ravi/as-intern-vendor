import dbConnect from "@/lib/dbConnect";
import vendorModel from "@/model/vendor-model";
import { NextResponse } from "next/server";

export async function GET(req) {
  // Get vendorId from query parameters
  const { searchParams } = new URL(req.url);
  const vendorId = searchParams.get("vendorId");

  if (!vendorId) {
    return NextResponse.json(
      { success: false, message: "vendorId is required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();  // Ensure that dbConnect is successful


    const user = await vendorModel.findById(vendorId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching vendor:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
