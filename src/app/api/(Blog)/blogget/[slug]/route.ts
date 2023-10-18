import connectDB from "@/config/db";
import Blog from "@/model/Blog";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}: {params: any}) {
    const slug = params.slug
    await connectDB();
    const result = await Blog.find({slug});
    return NextResponse.json({
        success: true,
        data: result,
    });
}
