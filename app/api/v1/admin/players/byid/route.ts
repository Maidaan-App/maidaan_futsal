import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import Players from "@/models/Users/Players";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request:Admin Get Player by id");
  const user = await currentRole();

  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("id");

  try {
    await connectMongo();
    if (user === "admin") {
      const doc = await Players.findOne({ _id });
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
