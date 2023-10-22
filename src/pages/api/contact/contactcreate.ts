import connectDB from "@/config/db";
import Contact from "@/model/Contact";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Not Exist Method == POST Condition
        if (req.method !== "POST") {
            return res.status(400).json({ success: false, message: "METHOD NOT ALLOWED" });
        }

        const receiveData = req.body;

        await connectDB()

        const data = new Contact({
            name: receiveData.name,
            email: receiveData.email,
            message: receiveData.message,
        })
        await data.save();

        return res.status(201).json({ success: true, message: "Admin Contact Successfully"});
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default handler;