import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import vendorModel from "@/model/vendor-model";
import sendVerificationEmail from "@/helper/sendVerificationEmail";


export async function POST(request) {
  await dbConnect();
  try {
    const { firstName, lastName, contactNumber, email, password } =
      await request.json();
    const existingUserVerified = await vendorModel.findOne({
      email,
      isVerified: true,
    });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserVerified) {
      if (existingUserVerified.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserVerified.password = hashedPassword;
        existingUserVerified.verifyCode = verifyCode;
        await existingUserVerified.save();

        return Response.json(
          {
            success: true,
            message: "User updated successfully. Please verify your email.",
            userId: existingUserVerified._id,
          },
          { status: 200 }
        );
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const CodeExpiry = new Date(Date.now() + 10 * 60 * 1000);

      const newUser = new vendorModel({
        firstName,
        lastName,
        contactNumber,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: CodeExpiry,
      });
      await newUser.save();

      // Send the verification email
      const emailResponse = await sendVerificationEmail(
        email,
        firstName,
        verifyCode
      );
      if (!emailResponse.success) {
        return Response.json(
          {
            success: false,
            message: emailResponse.message,
          },
          { status: 500 }
        );
      }
      return Response.json(
        {
          success: true,
          message: "User registered successfully. Please verify your email.",
          userId: newUser._id,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
