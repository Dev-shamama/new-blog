import connectDB from "@/config/db";
import Contact from "@/model/Contact";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Not Exist Method == POST Condition
        if (req.method !== "GET") {
            return res.status(400).json({ success: false, message: "METHOD NOT ALLOWED" });
        }
        await connectDB()

        const result = await Contact.find()
        return res.status(200).json({ success: true, data: result })

    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default handler;