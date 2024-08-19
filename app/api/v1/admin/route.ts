import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import Players from "@/models/Users/Players";
import User from "@/models/Users/User";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Player");
  const user = "admin";

  try {
    const Data = await request.json();
    await connectMongo();

    if (user === "admin") {
      const hashedPassword = await bcrypt.hash(Data.password, 10);
      const newDoc = new User({ ...Data, password: hashedPassword });
      await newDoc.save();
      return NextResponse.json({ message: "New User Added" }, { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
