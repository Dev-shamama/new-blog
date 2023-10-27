import Blog from "@/model/Blog";
import { isLogged } from "@/utils/isLogged";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Not Exist Method == POST Condition
    if (req.method !== "GET") {
        return res.status(400).json({ success: false, message: "METHOD NOT ALLOWED" });
    }
    
    try {

        const user = await isLogged(req, res);

        const result = await Blog.find({ userId: user._id });

        return res.status(200).json({ success: true, data: result })

    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default handler;