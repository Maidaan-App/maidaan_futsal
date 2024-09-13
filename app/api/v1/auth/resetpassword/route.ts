import connectMongo from "@/lib/connectMongo";
import User from "@/models/Users/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  console.log("Running POST request: Reset Password");

  try {
    const {_id, token, password } = await request.json();
    console.log(_id,token,password)
    await connectMongo();

    const existingUser = await User.findOne({
      _id,
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!existingUser)
      return NextResponse.json(
        { message: "Invalid or link expired" },
        { status: 404 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    existingUser.password = hashedPassword;
    existingUser.forgotPasswordToken = undefined;
    existingUser.forgotPasswordTokenExpiry = undefined;
    await existingUser.save();

    return NextResponse.json(
      { message: "Your password has been reset successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
