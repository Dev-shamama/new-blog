import connectDB from "@/config/db";
import Blog from "@/model/Blog";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Not Exist Method == POST Condition
        if (req.method !== "GET") {
            return res.status(400).json({ success: false, message: "METHOD NOT ALLOWED" });
        }

        await connectDB()
        const result = await Blog.find();
        return res.status(200).json({ success: true, message: "Created Successfully", data: result })

    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default handler;