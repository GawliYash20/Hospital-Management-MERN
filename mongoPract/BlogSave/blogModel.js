import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema ({
    title: {
        type: String
    },
    author: {
        type: String
    },
    body: {
        type: String
    },
    comments: [
        {
            body: {
                type: String
            },
            date: {
                type: Date
            }
        }
    ],

    hidden: {
        type: Boolean
    },
    meta: {
        votes: {
            type: Number
        },
        favs: {
            type: Number
        }
    }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;