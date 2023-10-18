import connectDB from "@/config/db";
import TutorialContent from "@/model/TutorialContent";
import TutorialHeadingList from "@/model/TutorialHeadingList";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: any }) {
    const slug = params.slug;
    const req = await request.json();
    await connectDB();

    const data = {
        title: req.title,
        slug: req.slug,
    }

    const tutorialList: any = await TutorialHeadingList.find({language: slug});

    tutorialList[0].list.filter((item: any) => {
        if (item._id.toString() === req.id) {
            item.children.push(data);
        }
    })

    const result = await tutorialList[0].save();

    return NextResponse.json({
        success: true,
        message: "Tutorial Create Successfully",
        data: result
    });
}



export async function DELETE(request: NextRequest, { params }: { params: any }) {
    const slug = params.slug;
    const req = await request.json();
    await connectDB();

    await TutorialContent.findOneAndRemove({slugTitle: req.contentSlug})

    const result = await TutorialHeadingList.findOneAndUpdate(
        { language: slug },
        {
            $pull: { 'list.$[headingId].children': {_id: req.id} }
        },
        {
            new: true,
            arrayFilters: [{ 'headingId._id': req.headingId }],
        },
    )

    return NextResponse.json({
        success: true,
        message: "Tutorial Heading Update Successfully",
        data: result
    });
}