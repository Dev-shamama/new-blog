import connectDB from "@/config/db";
import TutorialHeadingList from "@/model/TutorialHeadingList";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();
  await connectDB();

  const data = new TutorialHeadingList({
    language: req.language,
  })
  const result = await data.save();

  return NextResponse.json({
    success: true,
    message: "Language Create Successfully",
    data: result
  });
}
