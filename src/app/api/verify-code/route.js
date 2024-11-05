import dbConnect from "@/lib/dbConnect";
import vendorModel from "@/model/vendor-model";

export async function POST(request) {
  await dbConnect();

  try {
    const { userId, code } = await request.json();

    const user = await vendorModel.findById(userId);
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if the verification code has expired
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
    if (!isCodeNotExpired) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Verification code has expired.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if the provided code matches the user's stored code
    const isCodeValid = user.verifyCode === code;
    if (!isCodeValid) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Incorrect verification code.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Update the user as verified and clear the verification code and expiry
    user.isVerified = true;
    user.verifyCode = null; // set to null for better type consistency
    user.verifyCodeExpiry = null;
    await user.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Account verified successfully.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error verifying user:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error verifying user.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
