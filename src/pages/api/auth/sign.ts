import connectDB from "@/config/db";
import User from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Not Exist Method == POST Condition
        if (req.method !== "POST") {
            return res.status(400).json({ success: false, message: "METHOD NOT ALLOWED" });
        }

        const receiveData = req.body;

        await connectDB()

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(receiveData.password, salt);
    

        const emailExist = await User.find({ email: receiveData.email })
        if (emailExist.length > 0) {
            return res.status(401).json({ success: false, message: "email is already exist" });
        }


        const data = new User({
            name: receiveData.name,
            email: receiveData.email,
            password: hash,
            role: receiveData.role
        });

        await data.save();

        return res.status(201).json({ success: true, message: "Account Created Successfully"});
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default handler;