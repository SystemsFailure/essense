import mongoose from "mongoose";
import commentSchema from "../schemas/Comment.schema";

const CommentModel = mongoose.model('Comments', commentSchema);

export {
    CommentModel,
}