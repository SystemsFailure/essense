import mongoose from "mongoose";
import { Comment } from "../../../types/Comment.types";
const {Schema} = mongoose;
// import { Image } from "../../../types/Image.types";
const commentSchema = new Schema<Comment>({
    userId: String,
    destinationId: String || Boolean,
    body: String,
    likes: Number,
    avatarUrl: String,
    postId: String,
})

export default commentSchema;