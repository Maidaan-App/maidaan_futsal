import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import Amenities from "@/models/Amenities/Amenities";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Amenities");
  const user = await currentUser();

  try {
    const Data = await request.json();
    await connectMongo();

    if (user?.role === "admin") {
      const existingDoc = await Amenities.findOne({
        _id: Data?._id,
        linkedUserId: user.id,
      });
      if (existingDoc) {
        await existingDoc.updateOne(Data);
        return NextResponse.json({ message: "Updated" }, { status: 201 });
      } else {
        const newUser = new Amenities({
          amenities: Data.amenities,
          linkedUserId: user.id,
        });

        await newUser.save();
        return NextResponse.json({ message: "Added" }, { status: 201 });
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

export const GET = async () => {
  console.log("Running GET request: Admin Get all Amenities");
  const user = await currentUser();
  try {
    await connectMongo();

    if (user?.role === "admin") {
      const doc = await Amenities.findOne({ linkedUserId: user.id });
      return NextResponse.json(doc, { status: 200 });
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while fetching news events" },
      { status: 500 }
    );
  }
};
