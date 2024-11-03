import connectMongo from "@/lib/connectMongo";
import NewsEvents from "@/models/NewsEvents/NewsEvents";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request: Get News Event by slug");
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  try {
    await connectMongo();
    const doc = await NewsEvents.findOne({ slug });
    if (!doc) {
      return NextResponse.json(
        { message: "News Event Not Found" },
        { status: 404 }
      );
    }
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
