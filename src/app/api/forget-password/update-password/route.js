const dbConnect = require("@/lib/dbConnect");
import vendorModel from "@/model/vendor-model";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await dbConnect();
  try {
    const { email, password } = await request.json();
    const user = await vendorModel.findOne({email});
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Password updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in update password", error);
    return Response.json(
      {
        success: false,
        message: "Error in update password",
      },
      { status: 500 }
    );
  }
}
