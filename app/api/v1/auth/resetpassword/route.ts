import { NextRequest, NextResponse } from "next/server";


export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  console.log("Running POST request: Reset Password");

  try {
   
  } catch (error: any) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
