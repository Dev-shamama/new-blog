import connectDB from "@/config/db";
import TutorialHeadingList from "@/model/TutorialHeadingList";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Not Exist Method == POST Condition
        if (req.method !== "POST") {
            return res.status(400).json({ success: false, message: "METHOD NOT ALLOWED" });
        }

        const receiveData = req.body;
        console.log(receiveData)
        await connectDB()

        const data = new TutorialHeadingList({
            language: receiveData.language,
          })
        const result = await data.save();

        return res.status(201).json({ success: true, message: "Language Create Successfully", data: result});
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default handler;