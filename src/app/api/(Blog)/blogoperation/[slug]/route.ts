import connectDB from "@/config/db";
import Blog from "@/model/Blog";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: any }) {
    const id = params.slug;
    await connectDB();

    const result = await Blog.findByIdAndDelete(id);

    return NextResponse.json({
        success: true,
        message: "Blog Delete Successfully",
        data: result
    });
}


export async function PUT(request: NextRequest, { params }: { params: any }) {
    const id = params.slug;
    const req = await request.json();
    await connectDB();

    const result = await Blog.findByIdAndUpdate(id, req, { new: true });

    return NextResponse.json({
        success: true,
        message: "Blog Update Successfully",
        data: result
    });
}
