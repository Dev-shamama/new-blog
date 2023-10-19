import { NextResponse } from "next/server";
import connectDB from "../../../../../config/db";
import Contact from "../../../../../model/Contact";

export async function GET() {
    await connectDB();
    const result = await Contact.find()
    return NextResponse.json({ success: true, message: "Admin Contact Successfully", data: result })
}