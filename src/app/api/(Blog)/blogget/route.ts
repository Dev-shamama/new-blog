import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import Blog from "@/model/Blog";

export async function GET() {
    let result = null
    await connectDB();

    result = await Blog.find();

    if (result === undefined) {
        result = null
    }

    return NextResponse.json({
        success: true,
        data: result,
    });
}
