import connectMongo from "@/lib/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Users from "@/models/Users/User";

export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  console.log("Running POST request: Reset Password");

  try {
    const { token, password } = await request.json();
    await connectMongo();

    const user = await Users.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Link Invalid or Expired" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password Reset successfull" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
