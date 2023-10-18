import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import TutorialContent from "@/model/TutorialContent";

export async function GET(request: NextRequest, { params }: { params: any }) {
  await connectDB();
  const data = await TutorialContent.find({slugTitle: params.slug});
  return NextResponse.json({
    success: true,
    message: "Tutorial Create Successfully",
    data,
  });
}
