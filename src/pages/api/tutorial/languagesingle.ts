import connectDB from "@/config/db";
import { errorHandler } from "@/middleware/error";
import TutorialHeadingList from "@/model/TutorialHeadingList";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {lang} = req.query
        
        // Not Exist Method == POST Condition
        if (req.method !== "GET") {
            return errorHandler(res, 400, "ONLY POST METHOD IS ALLOWED");
        }
        await connectDB();

        const result = await TutorialHeadingList.find({ language: lang });

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default handler;
