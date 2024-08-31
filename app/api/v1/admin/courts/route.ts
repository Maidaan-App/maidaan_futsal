import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import Courts from "@/models/Courts/Courts";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Court");
  const user = await currentRole();

  try {
    const Data = await request.json();
    await connectMongo();

    if (user === "admin") {
      const existingDoc = await Courts.findOne({ _id: Data?._id });
      if (existingDoc) {
        //check if image has been changed or not if yes delete previous one
        if (existingDoc.image && existingDoc.image != Data.image) {
          await minioClient.removeObject(BUCKET_NAME, existingDoc.image);
        }
        await existingDoc.updateOne(Data);
        return NextResponse.json({ message: "Court Updated" }, { status: 201 });
      } else {
        const newDoc = new Courts({ ...Data });
        await newDoc.save();
        return NextResponse.json(
          { message: "New Court Added" },
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
  const user = await currentRole();

  try {
    await connectMongo();
    if (user === "admin") {
      const docs = await Courts.find().sort({
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
  const user = await currentRole();

  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user === "admin") {
      const exisitingDoc = await Courts.findOne({ _id });
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
