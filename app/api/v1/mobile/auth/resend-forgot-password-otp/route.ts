import connectMongo from "@/lib/connectMongo";
import User from "@/models/Users/User";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  console.log("Running POST request: User Resend Forgot Password OTP");

  try {
    const { phone } = await request.json();
    await connectMongo();
    const currentDate = Date.now();
    const forgotPasswordToken = "1111";

    const existingUser = await User.findOne({
      phone,
    });

    if (existingUser) {
      existingUser.forgotPasswordToken = forgotPasswordToken;
      existingUser.forgotPasswordTokenExpiry = currentDate + 2 * 60 * 1000;
      await existingUser.save();
    }

    return NextResponse.json(
      { message: "OTP Code Re-Sent (1111) Expires in 2 mins" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
