import vendorModel from "@/model/vendor-model";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req) {
  try {
    // Extract data from request body
    const { name, email, contact, reference_id } = await req.json();

    // Razorpay API credentials from environment variables
    const RAZORPAY_KEY = process.env.RAZORPAY_KEY;
    const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;

    // Encode Razorpay credentials for authorization header
    const authHeader = Buffer.from(
      `${RAZORPAY_KEY}:${RAZORPAY_SECRET}`
    ).toString("base64");

    // Prepare payload for creating the Razorpay contact
    const payload = {
      name,
      email,
      contact,
      type: "vendor", // "vendor" is the contact type for sellers
      reference_id, // Optional: Unique identifier for the vendor
    };

    // Send a POST request to Razorpay API to create the contact
    const razorpayResponse = await axios.post(
      "https://api.razorpay.com/v1/contacts",
      payload,
      {
        headers: {
          Authorization: `Basic ${authHeader}`, // Set the authorization header with base64-encoded credentials
          "Content-Type": "application/json", // Set content type to JSON
        },
      }
    );

    // Extract Razorpay contactId
    const { id: contactId } = razorpayResponse.data;
    const _id = reference_id;
    // Store contactId in your database
    const vendor = await vendorModel.findByIdAndUpdate(
      { _id }, // Match vendor by reference_id
      { razorpayContactId: contactId }, // Update the razorpayContactId field
      { new: true, upsert: true } // Create the vendor if it does not exist
    );

    // Return success response to client
    return NextResponse.json(
      { success: true, razorpayContactId: contactId, vendor },
      { status: 200 }
    );
  } catch (error) {
    // Log and return any errors encountered
    console.error(error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to create contact", details: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
