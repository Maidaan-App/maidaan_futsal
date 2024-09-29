import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import User from "@/models/Users/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("Running POST request: Admin Change Password");
  const user = await currentUser();

  try {
    const { currentPassword, newPassword } = await request.json();
    await connectMongo();

    const existingUser = await User.findOne({
      _id: user?.id,
    });

    if (!existingUser)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    //check if current password is correct
    const passwordsMatch = await bcrypt.compare(
      currentPassword,
      existingUser.password
    );
    if (!passwordsMatch)
      return NextResponse.json(
        { message: "Your Current Password is Incorrect" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(newPassword, 10);

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
