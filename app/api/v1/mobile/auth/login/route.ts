import connectMongo from "@/lib/connectMongo";
import User from "@/models/Users/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  console.log("Running POST request: User Login");

  try {
    const { phone, password } = await request.json();
    await connectMongo();

    const existingUser = await User.findOne({
      phone,
      status: true,
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 400 }
      );
    }

    const passwordsMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordsMatch) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 400 }
      );
    }

    return NextResponse.json(existingUser, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
