import registerVendorMailSend from "@/helper/registerVendorMailSend";
import dbConnect from "@/lib/dbConnect";
import vendorModel from "@/model/vendor-model";

export async function POST(request) {
  await dbConnect();

  try {
    const { userId, code } = await request.json();

    // Utility function to streamline responses
    const jsonResponse = (status, success, message) =>
      new Response(JSON.stringify({ success, message }), {
        status,
        headers: { "Content-Type": "application/json" },
      });

    // Check if user exists
    const user = await vendorModel.findById(userId);
    if (!user) return jsonResponse(404, false, "User not found");

    // Verify code expiration
    if (new Date(user.verifyCodeExpiry) <= new Date()) {
      return jsonResponse(400, false, "Verification code has expired.");
    }

    // Verify code accuracy
    if (user.verifyCode !== code) {
      return jsonResponse(400, false, "Incorrect verification code.");
    }

    // Update user verification status
    user.isVerified = true;
    user.verifyCode = null;
    user.verifyCodeExpiry = null;
    await user.save();

    // Send notification email
    await registerVendorMailSend(user.email, user.firstName);

    return jsonResponse(200, true, "Account verified successfully.");
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
