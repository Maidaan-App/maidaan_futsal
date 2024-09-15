import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import FutsalProfile from "@/models/Users/FutsalProfile";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Profile");
  const user = await currentUser();

  try {
    const Data = await request.json();
    await connectMongo();

    if (user?.role === "admin") {
      const existingDoc = await FutsalProfile.findOne({ _id: Data?._id });
      if (existingDoc) {
        await existingDoc.updateOne(Data);
        return NextResponse.json(
          { message: "Profile Updated" },
          { status: 201 }
        );
      } else {
        const newDoc = new FutsalProfile({ ...Data, linkedUserId: user.id });
        await newDoc.save();
        return NextResponse.json(
          { message: "New Profile Added" },
          { status: 201 }
        );
      }
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};

export const GET = async (request: NextRequest) => {
  console.log("Running GET request:Admin Get My Profile");
  const user = await currentUser();

  try {
    await connectMongo();
    if (user.role === "admin") {
      const doc = await FutsalProfile.findOne();

      if (!doc) {
        return NextResponse.json(
          { message: "No Profile Found" },
          { status: 404 }
        );
      }
      return NextResponse.json(doc, { status: 200 });
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
