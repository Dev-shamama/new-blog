import connectDB from "@/config/db";
import Blog from "@/model/Blog";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Not Exist Method == POST Condition
        if (req.method !== "POST") {
            return res.status(400).json({ success: false, message: "METHOD NOT ALLOWED" });
        }

        const receiveData = JSON.parse(req.body);
        console.log(receiveData);

        await connectDB()

        const data = new Blog({
            title: receiveData.title,
            description: receiveData.description,
            author: receiveData.author,
            slug: receiveData.slug,
            content: receiveData.content,
        });
        const result = await data.save();


        return res.status(201).json({ success: true, message: "Blog Created Successfully", data: result});
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default handler;