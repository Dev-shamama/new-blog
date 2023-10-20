import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../config/db";
import Contact from "../../../../../model/Contact";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
    await connectDB();
    const result = await Contact.find()
    return NextResponse.json({ success: true, message: "Admin Contact Successfully", data: result })
}