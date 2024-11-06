import connectMongo from "@/lib/connectMongo";
import LogoConfiguration from "@/models/Configuration/LogoConfiguration";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request: Get Logo Config");

  try {
    await connectMongo();
    const data = await LogoConfiguration.findOne();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
