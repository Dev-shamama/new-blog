import connectDB from "@/config/db";
import TutorialContent from "@/model/TutorialContent";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Not Exist Method == POST Condition

        if (req.method !== "GET") {
            return res.status(400).json({ success: false, message: "METHOD NOT ALLOWED" });
        }

        const { slug } = req.query;
        await connectDB()
        const result = await TutorialContent.find({ slugTitle: slug });
        return res.status(200).json({ success: true, data: result })

    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default handler;
