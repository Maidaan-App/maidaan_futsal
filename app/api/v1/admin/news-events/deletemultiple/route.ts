import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import NewsEvents from "@/models/NewsEvents/NewsEvents";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Admin DELETE Multiple News Event by id");
  const user = await currentUser();

  try {
    await connectMongo();
    const { ids } = await request.json();

    if (user?.role === "admin") {
      const ToDelete = await NewsEvents.find({
        _id: { $in: ids },
        linkedUserId: user.id,
      });

      if (!ToDelete || ToDelete.length === 0) {
        return NextResponse.json(
          { message: "No Blogs Found" },
          { status: 404 }
        );
      }
      await NewsEvents.deleteMany({
        _id: { $in: ids },
        linkedUserId: user.id,
      });

      for (const doc of ToDelete) {
        if (doc.image != null) {
          await minioClient.removeObject(BUCKET_NAME, doc.image);
        }
      }

      return NextResponse.json(
        { message: "News Events Deleted" },
        { status: 201 }
      );
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
