import mongoose from "mongoose";
import postSchema from "../schemas/Post.schema";

const PostModel = mongoose.model('Posts', postSchema);

export {
    PostModel,
}