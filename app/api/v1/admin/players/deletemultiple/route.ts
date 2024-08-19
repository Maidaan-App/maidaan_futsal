import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import Players from "@/models/Users/Players";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Admin DELETE Multiple Players by id");
  const user = await currentRole();

  try {
    await connectMongo();
    const { ids } = await request.json();
    if (user === "admin") {
      const ToDelete = await Players.find({
        _id: { $in: ids },
      });

      if (!ToDelete || ToDelete.length === 0) {
        return NextResponse.json(
          { message: "No Players Found" },
          { status: 404 }
        );
      }
      await Players.deleteMany({
        _id: { $in: ids },
      });

      for (const element of ToDelete) {
        if (element.image != null) {
          await minioClient.removeObject(BUCKET_NAME, element.image);
        }
      }

      return NextResponse.json({ message: "Players Deleted" }, { status: 201 });
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
