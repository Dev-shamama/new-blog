import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../config/db";
import Contact from "../../../../../model/Contact";

export async function POST(request: NextRequest) {
    const req = await request.json();
    await connectDB();

    const data = new Contact({
        name: req.name,
        email: req.email,
        message: req.message,
    })
    const result = await data.save();

    return NextResponse.json({ success: true, message: "Admin Contact Successfully" })

}