import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import TutorialHeadingList from "@/model/TutorialHeadingList";

export async function GET(request: NextRequest, content:any) {
    // const id = content.params.slug;
    const langSlug = content.params;
    await connectDB();
    // console.log("===========================================================langSlug")
    // console.log(langSlug)

    const data = await TutorialHeadingList.find({language: langSlug.slug});
    console.log(data);
    return NextResponse.json({
        success: true,
        data: data
    });
}
