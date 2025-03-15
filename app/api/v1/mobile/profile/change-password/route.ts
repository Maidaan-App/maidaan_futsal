import connectMongo from "@/lib/connectMongo";
import User from "@/models/Users/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  console.log("Running POST request:User Change Password");

  try {
    const { phone, current_password, new_password } = await request.json();
    await connectMongo();

    const existingUser = await User.findOne({
      phone,
    });

    if (!existingUser)
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });

    const passwordsMatch = await bcrypt.compare(
      current_password,
      existingUser.password
    );

    if (!passwordsMatch) {
      return NextResponse.json(
        { message: "Old Password is Incorrect" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    existingUser.password = hashedPassword;
    await existingUser.save();

    return NextResponse.json(
      { message: "Your password has been changed successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
