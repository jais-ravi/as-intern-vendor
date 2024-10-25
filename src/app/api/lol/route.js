// app/api/upload/route.js

import multer from "multer";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Adjust the import according to your folder structure
import Image from "@/model/image"; // Import the Image model

// Configure Multer for file storage
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Use a middleware function for Multer
// const uploadMiddleware = upload.single("image");

export async function POST(request) {
  // Convert the Next.js request into a Node.js request
  const formData = await request.formData();
  const file = formData.get("image");

  // Check if file is present
  if (!file) {
    return NextResponse.json({ message: "No file uploaded." }, { status: 400 });
  }

  // Connect to the database
  await dbConnect();

  // Create a file object to store in MongoDB
  const fileData = new Image({
    filename: file.name,  // Use file.name to get the original filename
    contentType: file.type, // Use file.type to get the content type
    size: file.size,       // Use file.size to get the file size
    data: Buffer.from(await file.arrayBuffer()), // Convert file data to Buffer
  });
  console.log(Buffer.from(await file.arrayBuffer()))
  try {
    // Save the file data to MongoDB
    const result = await fileData.save(); // Use Mongoose to save the document
    console.log("File uploaded with id:", result._id);

    return NextResponse.json({ message: "Image uploaded successfully!", id: result._id }, { status: 200 });
  } catch (error) {
    console.error("Failed to upload image:", error);
    return NextResponse.json({ message: "Failed to upload image", error }, { status: 500 });
  }
}

