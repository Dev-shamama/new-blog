import connectDB from "@/config/db";
import TutorialContent from "@/model/TutorialContent";
import tutorialHeadingList from "@/model/TutorialHeadingList";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: any }) {
  const slug = params.slug;
  const req = await request.json();
  await connectDB();

  const contentUpdate = await TutorialContent.find({
    slugTitle: req.contentSlug,
  });

  console.log(contentUpdate);

  if (contentUpdate.length > 0) {
    contentUpdate[0].slugTitle = req.slug;
    await contentUpdate[0].save();
  }

  const tutorialList: any = await tutorialHeadingList.find({ language: slug });

  if (tutorialList) {
    tutorialList[0].list.forEach((rev: any) => {
      if (rev._id.toString() === req.headingId.toString()) {
        rev.children.forEach((children: any) => {
          if (children._id.toString() === req.listId.toString())
            (children.title = req.title), (children.slug = req.slug);
        });
      }
    });
  }

  const result = await tutorialList[0].save();

  return NextResponse.json({
    success: true,
    message: "Tutorial Heading List Update Successfully",
  });
}
