import connectMongo from "@/lib/connectMongo";
import User from "@/models/Users/User";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request:User Forgot Password");
  try {
    await connectMongo();

    const { phone } = await request.json();
    const currentDate = Date.now();

    const forgotPasswordToken = "1111";

    const existingUser = await User.findOne({ phone });

    if (!existingUser)
      return NextResponse.json(
        {
          message: "User Not Found",
        },
        { status: 404 }
      );

    const updatedData = {
      forgotPasswordToken,
      forgotPasswordTokenExpiry: currentDate + 2 * 60 * 1000,
    };
    await existingUser.updateOne(updatedData);

    return NextResponse.json(
      {
        message: "OTP Code Sent (1111) Expires in 2 mins",
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
