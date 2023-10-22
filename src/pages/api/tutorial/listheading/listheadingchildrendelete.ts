import connectDB from "@/config/db";
import TutorialContent from "@/model/TutorialContent";
import tutorialHeadingList from "@/model/TutorialHeadingList";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Not Exist Method == POST Condition
        if (req.method !== "DELETE") {
            return res.status(400).json({ success: false, message: "METHOD NOT ALLOWED" });
        }
        const {slug} = req.query
        const receiveData = req.body
        console.log(slug)
        console.log(receiveData)
        await connectDB()
        await TutorialContent.findOneAndRemove({slugTitle: receiveData.contentSlug})

        const result = await tutorialHeadingList.findOneAndUpdate(
            { language: slug },
            {
                $pull: { 'list.$[headingId].children': {_id: receiveData.id} }
            },
            {
                new: true,
                arrayFilters: [{ 'headingId._id': receiveData.headingId }],
            },
        )

        return res.status(200).json({ success: true, message: "List Heading Children Delete Successfully", data: result });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default handler;