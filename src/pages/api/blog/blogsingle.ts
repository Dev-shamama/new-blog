import connectDB from "@/config/db";
import { errorHandler } from "@/middleware/error";
import Blog from "@/model/Blog";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const { title, text } = JSON.parse(req.body);
    const { slug } = req.query;

    // Not Exist Method == POST Condition
    if (req.method !== "GET") {
      return errorHandler(res, 400, "ONLY POST METHOD IS ALLOWED");
    }
    await connectDB();

    const result = await Blog.find({slug});

    return res.status(200).json({ success: true, message: "Blog Get Successfully", data: result });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;