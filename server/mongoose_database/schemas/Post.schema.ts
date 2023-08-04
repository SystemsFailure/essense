import mongoose from "mongoose";
import { PostForCreate } from "../../../types/Post.types";
const {Schema} = mongoose;
// import { Image } from "../../../types/Image.types";
const postSchema = new Schema<PostForCreate>({
    title: String,
    body: String,
    atCreated: Date,
    views: Number,
    likes: Number,
    comments: Number,
    username: String,
    userAvatarUrl: String,
    images: [],
    userId: String,
})

export default postSchema;