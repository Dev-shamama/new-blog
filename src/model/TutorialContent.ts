import mongoose from "mongoose";

const tutorialSchema = new mongoose.Schema({
    slugTitle: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

const TutorialContent = mongoose.models.tutorialcontent || mongoose.model("tutorialcontent", tutorialSchema)

export default TutorialContent