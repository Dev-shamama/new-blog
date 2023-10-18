import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

const Contact = mongoose.models.contact || mongoose.model("contact", contactSchema)

export default Contact