import connectMongo from "@/lib/connectMongo";
import { sendEmail } from "@/lib/sendEmail";
import User from "@/models/Users/User";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request:Auth Forgot Password");
  try {
    await connectMongo();

    const { email } = await request.json();
    const lowerCaseEmail = email.toLowerCase();
    
    const existingUser = await User.findOne({ email: lowerCaseEmail });

    if (!existingUser)
      return NextResponse.json(
        {
          message:
            "Password reset link has been sent to your email if it exists",
        },
        { status: 201 }
      );

    const hashedToken = await bcrypt.hash(existingUser._id.toString(), 10);
    const updatedData = {
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: Date.now() + 3600000,
    };
    await existingUser.updateOne(updatedData);

    const messageObject = {
      subject: "Reset your password",
      message: `Click on the following link: <a href="${process.env.DOMAIN}resetpassword?id=${existingUser._id}&token=${hashedToken}">Password Reset Link</a>`,
    };
    await sendEmail(existingUser.email, messageObject);

    return NextResponse.json(
      {
        message: "Password reset link has been sent to your email if it exists",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      {
        status: 400,
      }
    );
  }
};
