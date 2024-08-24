import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request:Auth Forgot Password");
  try {
   
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      {
        status: 400,
      }
    );
  }
};
