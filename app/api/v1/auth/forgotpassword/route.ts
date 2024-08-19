import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/lib/connectMongo";
import bcrypt from "bcryptjs";
import Users from "@/models/Users/User";
import { sendEmail } from "@/lib/sendEmail";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request:Auth Forgot Password");

  try {
    const { email } = await request.json();
    await connectMongo();
    const existingUser = await Users.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      const hashedToken = await bcrypt.hash(existingUser._id.toString(), 10);
      const updatedData = {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      };
      await existingUser.updateOne(updatedData);
      const messageObject = {
        subject: "Reset your password",
        message: `Click on the following link: <a href="${process.env.DOMAIN}resetpassword?token=${hashedToken}">Password Reset Link</a>`,
      };
      await sendEmail(existingUser.email, messageObject);
      return NextResponse.json(
        { message: "Reset Email Sent !!" },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "User Not Found" }, { status: 404});
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      {
        status: 400,
      }
    );
  }
};
