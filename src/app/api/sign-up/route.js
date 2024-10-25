import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import vendorModel from "@/model/vendor-model";
import sendVerificationEmail from "@/helper/sendVerificationEmail";

export async function POST(request) {
  await dbConnect();
  try {
    const { firstName,lastName, email, password } = await request.json();
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

        // Return _id in the response when user is updated but not verified yet
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

      const newUser = new vendorModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        verifyCode,
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

      // Return the _id of the newly created user
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
