import { currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import Courts from "@/models/Courts/Courts";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request:Admin Get Court by id");
  const user = await currentUser();

  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("id");

  try {
    await connectMongo();
    if (user?.role === "admin") {
      const doc = await Courts.findOne({ _id, linkedUserId: user.id });
      return NextResponse.json(doc, { status: 201 });
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
