import connectMongo from "@/lib/connectMongo";
import Players from "@/models/Users/Players";
import User from "@/models/Users/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  console.log("Running POST request: User Signup");

  try {
    const { name, phone, email, address, password } = await request.json();
    await connectMongo();
    const currentDate = Date.now();
    const verifyToken = "1111";

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({
      phone,
    });

    if (existingUser) {
      if (existingUser.status) {
        return NextResponse.json(
          { message: "Phone Number Already Taken" },
          { status: 404 }
        );
      } else {
        existingUser.name = name;
        existingUser.phone = phone;
        existingUser.email = email;
        existingUser.userType = "player";
        existingUser.password = hashedPassword;
        existingUser.verifyToken = verifyToken;
        existingUser.verifyTokenExpiry = currentDate + 2 * 60 * 1000;
        existingUser.createdDate = currentDate;

        await existingUser.save();

        const playerData = {
          linkedUserId: existingUser._id,
          email,
          phone,
          name,
          address,
          createdDate: currentDate,
        };

        const existingPlayerProfile = await Players.findOne({
          linkedUserId: existingUser._id,
        });
        if (existingPlayerProfile) {
          await existingPlayerProfile.updateOne(playerData);
        } else {
          const newPlayerProfile = new Players({ ...playerData });
          await newPlayerProfile.save();
        }
      }
    } else {
      const newUser = new User({
        phone,
        name,
        email,
        password: hashedPassword,
        userType: "player",
        verifyToken,
        verifyTokenExpiry: currentDate + 2 * 60 * 1000,
        createdDate: currentDate,
      });
      await newUser.save();

      const playerData = {
        linkedUserId: newUser._id,
        email,
        phone,
        name,
        address,
        createdDate: currentDate,
      };

      const newPlayerProfile = new Players({ ...playerData });
      await newPlayerProfile.save();
    }
    return NextResponse.json(
      { message: "OTP Code Sent (1111) Expires in 2 mins" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
