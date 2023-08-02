import { Comment } from "../../../types/Comment.types";
import {CommentModel} from "../models/Comment.model";


async function create(comment: Comment) {
    try {
        await CommentModel.create( comment );
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

async function getById(id: string) {
    try {
        const comment = await CommentModel.findById(id)
        return comment;
    } catch (error) {
        console.error(error);
        return false;
    }
};

async function getAll(postId: string) {
    try {
        const comments = await CommentModel.find({ postId: postId });
        return comments;
    } catch (error) {
        console.error(error);
    }
};

async function implementLike(commentId: string, comment__countLikes: number) {
    let result = false;
    comment__countLikes += 1;
    try {
        await CommentModel.findByIdAndUpdate( commentId,
            {
                $set: {
                    likes: comment__countLikes
                }
            });
        result = true;
        return result;
    } catch (error) {
        console.error(error);
        return result;

    }
}


export {
    create, getAll, getById, implementLike
}