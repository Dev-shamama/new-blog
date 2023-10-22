import connectDB from "@/config/db";
import TutorialContent from "@/model/TutorialContent";
import tutorialHeadingList from "@/model/TutorialHeadingList";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Not Exist Method == POST Condition
        if (req.method !== "PUT") {
            return res.status(400).json({ success: false, message: "METHOD NOT ALLOWED" });
        }
        const {slug} = req.query
        const receiveData = req.body

        await connectDB()
        const contentUpdate = await TutorialContent.find({
            slugTitle: receiveData.contentSlug,
          });
        
          console.log(contentUpdate);
        
          if (contentUpdate.length > 0) {
            contentUpdate[0].slugTitle = receiveData.slug;
            await contentUpdate[0].save();
          }
        
          const tutorialList: any = await tutorialHeadingList.find({ language: slug });
        
          if (tutorialList) {
            tutorialList[0].list.forEach((rev: any) => {
              if (rev._id.toString() === receiveData.headingId.toString()) {
                rev.children.forEach((children: any) => {
                  if (children._id.toString() === receiveData.listId.toString())
                    (children.title = receiveData.title), (children.slug = receiveData.slug);
                });
              }
            });
          }
        
          const result = await tutorialList[0].save();

        return res.status(200).json({ success: true,message: "Tutorial Heading List Update Successfully", });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default handler;