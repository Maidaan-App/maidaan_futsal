import connectMongo from "@/lib/connectMongo";
import Players from "@/models/Users/Players";
import User from "@/models/Users/User";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request:User Update Profile");
  try {
    await connectMongo();

    const { phone, name, email, address } = await request.json();

    const existingUser = await User.findOne({ phone });

    if (!existingUser)
      return NextResponse.json(
        {
          message: "User Not Found",
        },
        { status: 404 }
      );

    const updatedData = {
      phone,
      name,
      email,
      address,
    };
    await existingUser.updateOne(updatedData);

    //also update Profile

    const existingPlayerProfile = await Players.findOne({
      linkedUserId: existingUser._id,
    });
    await existingPlayerProfile.updateOne(updatedData);

    return NextResponse.json(
      {
        message: "Profile Updated !!!",
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
