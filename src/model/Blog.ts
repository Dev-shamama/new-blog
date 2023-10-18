import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    slug: {
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

const Blog = mongoose.models.blog || mongoose.model("blog", blogSchema)

export default Blog