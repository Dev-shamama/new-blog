import connectDB from "@/config/db";
import TutorialHeadingList from "@/model/TutorialHeadingList";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: any }) {
    const slug = params.tutoriallistslug;
    
    // console.log("=====================================================slug");
    // console.log(slug);
    const req = await request.json();
    await connectDB();

    const objectData = {
        heading: req.heading,
        children: [{
            title: req.title,
            slug: req.slug, 
        }]
    }

    const tutorialList:any = await TutorialHeadingList.find({language: slug});
    console.log(tutorialList)

    tutorialList[0].list.push(objectData);

    const result = await tutorialList[0].save();

    return NextResponse.json({
        success: true,
        message: "Tutorial Create Successfully",
        data: result
    });
}
