import mongoose from "mongoose";
const {Schema} = mongoose;
// import { Image } from "../../../types/Image.types";
const postSchema = new Schema({
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