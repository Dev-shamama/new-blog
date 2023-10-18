import connectDB from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import tutorialHeadingList from "@/model/TutorialHeadingList";

export async function DELETE(request: NextRequest, { params }: { params: any }) {
    const id = params.slug;
    await connectDB();

    const result = await tutorialHeadingList.findByIdAndDelete(id);


    return NextResponse.json({
        success: true,
        message: "Tutorial Language Delete Successfully",
        data: result
    });
}


export async function PUT(request: NextRequest, { params }: { params: any }) {
    const id = params.slug;
    const req = await request.json();
    await connectDB();

    const result = await tutorialHeadingList.findById(id);
    result.language = req.language;

    await result.save()

    return NextResponse.json({
        success: true,
        message: "Tutorial Heading Update Successfully",
        data: result
    });
}
