import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import connectDB from "@/config/db";
import User from "@/model/User";
import cookie from "cookie";

export const isLogged = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDB();
    const cook: any = cookie.parse(req.headers.cookie!);
    if (!cook.token) {
      return res.status(400).json({ success: false, message: "Access Denied" });
    }
    const userId: any = jwt.verify(cook.token, process.env.NEXT_PUBLIC_SECRET_KEY!);
    const user = await User.findOne({ _id: userId.id }).select("-password");
    return user;
  } catch (error: any) {
    console.log(error.message)
  }
};