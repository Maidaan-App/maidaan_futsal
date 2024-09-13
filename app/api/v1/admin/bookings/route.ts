import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import Bookings from "@/models/Bookings/Bookings";
import Courts from "@/models/Courts/Courts";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Booking");
  const user = await currentUser();

  try {
    const Data = await request.json();
    await connectMongo();

    if (user?.role === "admin") {
      const existingDoc = await Bookings.findOne({
        _id: Data?._id,
        linkedFutsalId: user.id,
      });
      if (existingDoc) {

        //handle for new user
        await existingDoc.updateOne(Data);
        return NextResponse.json({ message: "Booking Updated" }, { status: 201 });
      } else {
        //handle for new user

        const newDoc = new Bookings({ ...Data, linkedFutsalId: user.id });
        await newDoc.save();
        return NextResponse.json(
          { message: "New Booking Added" },
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

export const GET = async () => {
  console.log("Running GET request:Admin Get all Courts");
  const user = await currentUser();

  try {
    await connectMongo();
    if (user?.role === "admin") {
      const docs = await Courts.find({ linkedUserId: user.id }).sort({
        createdDate: -1,
      });
      return NextResponse.json(docs, { status: 201 });
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

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Admin DELETE Court by id");
  const user = await currentUser();

  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user?.role === "admin") {
      const exisitingDoc = await Courts.findOne({ _id, linkedUserId: user.id });
      if (!exisitingDoc) {
        return NextResponse.json(
          { message: "No Court Found" },
          { status: 404 }
        );
      }

      await Courts.deleteOne({ _id });
      if (exisitingDoc.image != null) {
        await minioClient.removeObject(BUCKET_NAME, exisitingDoc.image);
      }
      return NextResponse.json({ message: "Court Deleted" }, { status: 201 });
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
