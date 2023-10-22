import connectDB from "@/config/db";
import { errorHandler } from "@/middleware/error";
import TutorialHeadingList from "@/model/TutorialHeadingList";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const receiveData = req.body;
    
    // Not Exist Method == POST Condition
    if (req.method !== "DELETE") {
      return errorHandler(res, 400, "ONLY POST METHOD IS ALLOWED");
    }
    await connectDB();

    const result = await TutorialHeadingList.findOneAndUpdate(
      {language: slug},
      {
          $pull: { list: { _id: receiveData.id } }
      },
      {
          new: true,
          runValidators: true,
          useFindAndModify: false,
      })


    return res.status(200).json({ success: true, message: "List Heading Delete Successfully"});
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;