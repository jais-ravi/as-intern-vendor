import axios from "axios";
import { NextResponse } from "next/server";
import vendorModel from "@/model/vendor-model";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { encrypt } from "@/lib/crypto";

export async function POST(req) {
  try {
    const session = await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: No session found" },
        { status: 401 }
      );
    }

    const vendorId = session.user._id;
    const { accountNumber, ifsc, accountHolderName } = await req.json();
    const bank_account = {
      name: accountHolderName,
      ifsc,
      account_number: accountNumber,
    };

    // Validate environment variables
    const RAZORPAY_KEY = process.env.RAZORPAY_KEY;
    const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;

    // Fetch vendor details from the database
    const user = await vendorModel.findById(vendorId);
    if (!user) {
      throw new Error("Vendor not found");
    }

    const contact_id = user.razorpayContactId;
    if (!contact_id) {
      throw new Error("Razorpay contact ID is missing for this vendor");
    }

    // Encode Razorpay credentials for authorization header
    const authHeader = Buffer.from(
      `${RAZORPAY_KEY}:${RAZORPAY_SECRET}`
    ).toString("base64");

    // Prepare the payload for adding the bank account
    const payload = {
      contact_id,
      account_type: "bank_account",
      bank_account,
    };

    // Make API request to Razorpay
    const response = await axios.post(
      "https://api.razorpay.com/v1/fund_accounts",
      payload,
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/json",
        },
      }
    );

    const encryptedAccountNumber = encrypt(
      response.data.bank_account.account_number
    ).toString();
    const encryptedIfsc = encrypt(response.data.bank_account.ifsc).toString();


    // Update vendor in database
    const updatedVendor = await vendorModel.findByIdAndUpdate(
      vendorId,
      {
        $set: {
          fundAccountId: response.data.id,
          "bankDetails.accountNumber": encryptedAccountNumber,
          "bankDetails.ifsc": encryptedIfsc,
          "bankDetails.accountHolderName": response.data.bank_account.name,
        },
      },
      { new: true }
    );

    return NextResponse.json(
      { success: true, data: response.data, updatedVendor },
      { status: 200 }
    );
  } catch (error) {
    console.error(error.response?.data || error.message);

    // Check if the error response is from Razorpay and return appropriate message
    if (error.response && error.response.data) {
      return NextResponse.json(
        {
          error: "Failed to add fund account",
          details: error.response.data.error.description, // Razorpay error description
        },
        { status: 400 } // Bad Request
      );
    }

    // Generic error handling
    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
