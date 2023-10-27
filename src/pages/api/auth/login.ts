// import cookieSetter from "@/utils/cookieSetter";
import connectDB from "@/config/db";
// import JWTToken from "@/utils/jsonWebTokenSend";
import { errorHandler } from "@/middleware/error";
import User from "@/model/User";
import cookieSetter from "@/utils/cookieSetter";
import JWTToken from "@/utils/jsonWebTokenSend";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Not Exist Method == POST Condition
  if (req.method !== "POST") {
    return errorHandler(res, 400, "ONLY POST METHOD IS ALLOWED");
  }
  try {

    const receiveData = req.body;
    await connectDB()

    const user = await User.findOne({ email: receiveData.email })

    if (!user) {
      return errorHandler(res, 400, "Invalid Credential");
    }

    const isPasswordMatch = await bcrypt.compare(receiveData.password, user.password);

    if (!isPasswordMatch) {
      return errorHandler(res, 400, "Invalid Credential");
    }

    const token: string = JWTToken({ id: user.id });
    cookieSetter(res, token, true);

    res.status(200).json({
        success: true,
        message: "Login Successfully",
        // token
    })
  } catch (error:any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;