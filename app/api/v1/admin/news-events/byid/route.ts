import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import NewsEvents from "@/models/NewsEvents/NewsEvents";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request:Admin Get News Event by id");
  const user = await currentUser();

  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("id");

  try {
    await connectMongo();
    if (user?.role === "admin") {
      const doc = await NewsEvents.findOne({ _id, linkedUserId: user.id });

      if (!doc) {
        return NextResponse.json(
          { message: "No News Event Found" },
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
