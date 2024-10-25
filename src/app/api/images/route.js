// app/api/images/route.js

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Image from "@/model/image";

// GET handler to retrieve the stored images from the database
export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all image documents
    const images = await Image.find().select("filename contentType data");

    // Convert images to a format suitable for sending in the response
    const formattedImages = images.map((img) => ({
    //   _id: img._id,
    //   filename: img.filename,
    //   contentType: img.contentType,
      data: img.data.toString("base64"), // Convert binary data to base64 string
    }));

    return NextResponse.json(formattedImages, { status: 200 });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { message: "Error fetching images", error },
      { status: 500 }
    );
  }
}
