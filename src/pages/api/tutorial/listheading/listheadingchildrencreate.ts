import connectDB from "@/config/db";
import TutorialHeadingList from "@/model/TutorialHeadingList";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Not Exist Method == POST Condition
        if (req.method !== "POST") {
            return res.status(400).json({ success: false, message: "METHOD NOT ALLOWED" });
        }
        const { slug } = req.query
        const receiveData = req.body;
        await connectDB()
        const childrenData = {
            title: receiveData.title,
            slug: receiveData.slug,
        }

        const tutorialList: any = await TutorialHeadingList.find({ language: slug });

        tutorialList[0].list.filter((item: any) => {
            if (item._id.toString() === receiveData.id) {
                const data = item.children.filter((existSlug: any) => {
                    if (existSlug.slug === receiveData.slug) {
                        return true
                    } else {
                        return false
                    }
                })
                if (data.length > 0) {
                    return res.status(401).json({ success: false, message: "slug is already exist" });
                } else {
                    item.children.push(childrenData);

                }

            }
        })

        const result = await tutorialList[0].save();

        return res.status(201).json({ success: true, message: "List Heading Children Create Successfully", data: result });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default handler;