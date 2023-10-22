import connectDB from "@/config/db";
import { errorHandler } from "@/middleware/error";
import { NextApiRequest, NextApiResponse } from "next";
import TutorialHeadingList from "@/model/TutorialHeadingList";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const { title, text } = JSON.parse(req.body);
    const { id } = req.query;

    // Not Exist Mehthod == POST Condition
    if (req.method !== "DELETE") {
      return errorHandler(res, 400, "ONLY POST METHOD IS ALLOWED");
    }
    await connectDB();

    const result = await TutorialHeadingList.findByIdAndDelete(id);

    return res.status(200).json({success: true,
      message: "Tutorial Language Delete Successfully",
      data: result });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;