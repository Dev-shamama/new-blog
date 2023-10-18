import mongoose from "mongoose";

const tutorialHeadingListSchema = new mongoose.Schema({
    language: {
        type: String,
        require: true
    },
    list: [{
        heading: {
            type: String,
            require: true
        },
        children: [{
            title: {
                type: String,
                require: true
            },
            slug: {
                type: String,
                require: true
            },
        }]
    }],
    createAt: {
        type: Date,
        default: Date.now()
    }
})

const tutorialHeadingList = mongoose.models.tutorialheadinglist || mongoose.model("tutorialheadinglist", tutorialHeadingListSchema)

export default tutorialHeadingList