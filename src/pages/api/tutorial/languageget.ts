import connectDB from "@/config/db";
import TutorialHeadingList from "@/model/TutorialHeadingList";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Not Exist Method == POST Condition
        if (req.method !== "GET") {
            return res.status(400).json({ success: false, message: "METHOD NOT ALLOWED" });
        }
        await connectDB()

        let result = await TutorialHeadingList.find();
        
        return res.status(200).json({ success: true, data: result })

    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default handler;