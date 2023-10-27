import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "ADMIN"
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.models.user || mongoose.model("user", userSchema)

export default User