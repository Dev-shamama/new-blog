import connectDB from "@/config/db";
import TutorialHeadingList from "@/model/TutorialHeadingList";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: any }) {
    const slug = params.slug;
    const req = await request.json();
    await connectDB();

    const tutorialList: any = await TutorialHeadingList.find({language: slug});

    const isExist = tutorialList[0].list.find((rev: any) => {
        return rev._id.toString() === req.id.toString();
    }
    );

    if (isExist) {
        tutorialList[0].list.forEach((rev: any) => {
            if (rev._id.toString() === req.id.toString())
                (rev.heading = req.heading)
        });
    }

    const result = await tutorialList[0].save();

    return NextResponse.json({
        success: true,
        message: "Tutorial Heading Update Successfully",
        // data: result
    });
}


export async function DELETE(request: NextRequest, { params }: { params: any }) {
    const slug = params.slug;
    const req = await request.json();

    await connectDB();

    const result = await TutorialHeadingList.findOneAndUpdate(
        {language: slug},
        {
            $pull: { list: { _id: req.id } }
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })

    console.log(result);

    return NextResponse.json({
        success: true,
        message: "Tutorial Heading Update Successfully",
        data: result
    });
}

