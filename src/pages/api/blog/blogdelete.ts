import connectDB from "@/config/db";
import { errorHandler } from "@/middleware/error";
import Blog from "@/model/Blog";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const { title, text } = JSON.parse(req.body);
    const { id } = req.query;

    // Not Exist Mehthod == POST Condition
    if (req.method !== "GET") {
      return errorHandler(res, 400, "ONLY POST METHOD IS ALLOWED");
    }
    await connectDB();

    const result = await Blog.findByIdAndDelete(id);

    return res.status(200).json({ message: "Blog Delete Successfully" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;