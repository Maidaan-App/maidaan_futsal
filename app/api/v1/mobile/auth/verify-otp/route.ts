import connectMongo from "@/lib/connectMongo";
import User from "@/models/Users/User";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  console.log("Running POST request: User Verify OTP");

  try {
    const { phone, token } = await request.json();
    await connectMongo();

    const existingUser = await User.findOne({
      phone,
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!existingUser)
      return NextResponse.json(
        { message: "Invalid or OTP expired" },
        { status: 404 }
      );

    existingUser.status = true;
    existingUser.verifyToken = undefined;
    existingUser.verifyTokenExpiry = undefined;
    await existingUser.save();

    return NextResponse.json(
      { message: "OTP Verified. Signup Successful" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
