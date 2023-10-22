import connectDB from "@/config/db";
import { errorHandler } from "@/middleware/error";
import TutorialHeadingList from "@/model/TutorialHeadingList";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const receiveData = req.body;
    
    console.log(id);
    console.log(receiveData);

    // Not Exist Method == POST Condition
    if (req.method !== "PUT") {
      return errorHandler(res, 400, "ONLY POST METHOD IS ALLOWED");
    }
    
    await connectDB();

    const result = await TutorialHeadingList.findById(id);
    result.language = receiveData.language;

    await result.save()

    return res.status(200).json({ success: true, message: "Blog Update Successfully", data: result });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;