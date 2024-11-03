import connectMongo from "@/lib/connectMongo";
import { NextResponse } from "next/server";
import FutsalProfile from "@/models/Users/FutsalProfile";
import NewsEvents from "@/models/NewsEvents/NewsEvents";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request:Public Get Futsal News Events");
  await connectMongo();

  try {
    const currentFutsal = await FutsalProfile.findOne({ subdomain: "test" });

    const docs = await NewsEvents.find({
      linkedUserId: currentFutsal.linkedUserId,
    }).sort({
      createdDate: -1,
    });

    return NextResponse.json(docs, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
