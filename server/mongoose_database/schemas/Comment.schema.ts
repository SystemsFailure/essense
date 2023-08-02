import mongoose from "mongoose";
const {Schema} = mongoose;
// import { Image } from "../../../types/Image.types";
const commentSchema = new Schema({
    userId: String,
    destinationId: String || Boolean,
    body: String,
    likes: Number,
    avatarUrl: String,
    postId: String,
})

export default commentSchema;