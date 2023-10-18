import connectDB from "@/config/db";
import Blog from "@/model/Blog";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const req: any = await request.json();
    await connectDB();

    const data = new Blog({
        title: req.title,
        description: req.description,
        author: req.author,
        slug: req.slug,
        content: req.content,
    })

    const result = await data.save();

    return NextResponse.json({
        success: true,
        message: "Blog Create Successfully",
        data: result,
    });
}
