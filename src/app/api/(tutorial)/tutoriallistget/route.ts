import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import TutorialHeadingList from "@/model/TutorialHeadingList";

export async function GET() {
  let result = null
  await connectDB();

  result = await TutorialHeadingList.find();
  console.log(result)
  
  if (result === undefined) {
    result = null
  }

  return NextResponse.json({
    success: true,
    data: result
  });
}
