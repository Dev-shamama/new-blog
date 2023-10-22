import connectDB from "@/config/db";
import TutorialContent from "@/model/TutorialContent";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Not Exist Method == POST Condition

        if (req.method !== "POST") {
            return res.status(400).json({ success: false, message: "METHOD NOT ALLOWED" });
        }
        const receiveData = req.body;
        await connectDB();

        const ExistContent = await TutorialContent.findOne({
            slugTitle: receiveData.slugTitle,
        });

        let result = null;


        if (ExistContent !== null) {
            result = await TutorialContent.findOneAndUpdate(
                { slugTitle: receiveData.slugTitle },
                {
                    content: receiveData.content,
                },
                { new: true }
            );
        } else {
            let data = new TutorialContent({
                slugTitle: receiveData.slugTitle,
                content: receiveData.content,
            });
            result = await data.save();
        }

        return res.status(200).json({ success: true, data: result })

    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default handler;
