import connectDB from "@/config/db";
import { errorHandler } from "@/middleware/error";
import TutorialHeadingList from "@/model/TutorialHeadingList";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const receiveData = req.body;
    
    // Not Exist Method == POST Condition
    if (req.method !== "PUT") {
      return errorHandler(res, 400, "ONLY POST METHOD IS ALLOWED");
    }
    await connectDB();

    const tutorialList: any = await TutorialHeadingList.find({language: slug});


    const isExist = tutorialList[0].list.find((rev: any) => {
      return rev._id.toString() === receiveData.id.toString();
  }
  );

  if (isExist) {
      tutorialList[0].list.forEach((rev: any) => {
          if (rev._id.toString() === receiveData.id.toString())
              (rev.heading = receiveData.heading)
      });
  }

  const result = await tutorialList[0].save();

    return res.status(200).json({ success: true, message: "List Heading Update Successfully"});
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;