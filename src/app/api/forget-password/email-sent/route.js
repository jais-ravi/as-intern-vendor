import ForgotPasswordEmailSend from "@/helper/ForgotPasswordEmail";
import dbConnect from "@/lib/dbConnect";
import vendorModel from "@/model/vendor-model";


export async function POST(request) {
  await dbConnect();
  
  try {
    const { email } = await request.json();
    const user = await vendorModel.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        { status: 404 }  
      );
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    user.verifyCode = verifyCode;
    user.verifyCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const emailResponse = await ForgotPasswordEmailSend(
      email,
      user.firstName,
      verifyCode
    );

    if (!emailResponse.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: emailResponse.message,
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "OTP sent to your email",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in sending OTP:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Error in sending OTP",
      }),
      { status: 500 }
    );
  }
}
