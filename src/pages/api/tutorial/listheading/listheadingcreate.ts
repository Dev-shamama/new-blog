import connectDB from "@/config/db";
import TutorialHeadingList from "@/model/TutorialHeadingList";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Not Exist Method == POST Condition
        if (req.method !== "POST") {
            return res.status(400).json({ success: false, message: "METHOD NOT ALLOWED" });
        }
        const {slug} = req.query
        const receiveData = req.body;
        console.log(receiveData)
        await connectDB()

        const objectData = {
            heading: receiveData.heading,
            children: [{
                title: receiveData.title,
                slug: receiveData.slug, 
            }]
        }

        const tutorialList:any = await TutorialHeadingList.find({language: slug});
        console.log(tutorialList)
    
        tutorialList[0].list.push(objectData);
    
        const result = await tutorialList[0].save();

        return res.status(201).json({ success: true, message: "List Heading Create Successfully", data: result});
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default handler;