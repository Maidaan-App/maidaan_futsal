import connectMongo from "@/lib/connectMongo";
import User from "@/models/Users/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  console.log("Running POST request:User Reset Password");

  try {
    const { phone, password } = await request.json();
    await connectMongo();

    const existingUser = await User.findOne({
      phone,
    });

    if (!existingUser)
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });

    const hashedPassword = await bcrypt.hash(password, 10);

    existingUser.password = hashedPassword;
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
