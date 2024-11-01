import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import Gallery from "@/models/Gallery/Gallery";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add Gallery");
  const user = await currentUser();

  try {
    const Data = await request.json();
    await connectMongo();

    if (user?.role === "admin") {
      const { images } = Data;

      if (!Array.isArray(images) || images.length === 0) {
        return NextResponse.json(
          { message: "No images provided" },
          { status: 400 }
        );
      }

      // Create a new document for each image in the images array
      const galleryDocs = images.map((image) => ({
        linkedUserId: user.id,
        image,
        postedDate: new Date(),
      }));

      // Insert all documents at once
      await Gallery.insertMany(galleryDocs);

      return NextResponse.json(
        { message: "New Images added" },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } catch (error) {
    console.log("Error in adding images:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};

export const GET = async (request: NextRequest) => {
  console.log("Running GET request:Admin Get all Gallery Images by Id");
  const user = await currentUser();

  try {
    await connectMongo();
    if (user?.role === "admin") {
      const docs = await Gallery.find({ linkedUserId: user.id }).sort({
        postedDate: -1,
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
  console.log("Running DELETE request: Admin DELETE Gallery Image by id");
  const user = await currentUser();

  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user?.role === "admin") {
      const exisitingDoc = await Gallery.findOne({ _id,linkedUserId: user.id });
      if (!exisitingDoc) {
        return NextResponse.json(
          { message: "No Image Found" },
          { status: 404 }
        );
      }

      await Gallery.deleteOne({ _id });
      if (exisitingDoc.image != null) {
        await minioClient.removeObject(BUCKET_NAME, exisitingDoc.image);
      }
      return NextResponse.json({ message: "Image Deleted" }, { status: 201 });
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
