import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import TutorialHeadingList from "@/model/TutorialHeadingList";

export async function GET(request: NextRequest, content: any) {
    let result = null
    const langSlug = content.params;
    await connectDB();

    result = await TutorialHeadingList.find({ language: langSlug.slug });

    if (result === undefined) {
        result = null
    }

    return NextResponse.json({
        success: true,
        data: result
    });
}
