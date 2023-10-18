import connectDB from "@/config/db";
import TutorialContent from "@/model/TutorialContent";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req: any = await request.json();
  await connectDB();

  const ExistContent = await TutorialContent.findOne({
    slugTitle: req.slugTitle,
  });

  let result = null;


  if (ExistContent !== null) {
    result = await TutorialContent.findOneAndUpdate(
      { slugTitle: req.slugTitle },
      {
        content: req.content,
      },
      { new: true }
    );
  } else {
    let data = new TutorialContent({
      slugTitle: req.slugTitle,
      content: req.content,
    });
    result = await data.save();
  }

  return NextResponse.json({
    success: true,
    message: "Content Create Successfully",
    data: result,
  });
}
