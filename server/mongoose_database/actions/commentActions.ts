import { Comment } from "../../../types/Comment.types";
import {CommentModel} from "../models/Comment.model";
import { PostModel } from "../models/Post.model";


async function create(comment: Comment) {
    try {
        const returnedComment: any = await CommentModel.create( comment );

        if(returnedComment && returnedComment.postId) {
            const result = await implementCommentCountInPost(returnedComment?.postId);
            console.log(result, 'результат увеличения значения комментария');
            
        } else {
            console.error('Вернувщейся значение либо его свойство является is undefined');
            
        }

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
        const comments:Comment[] = await CommentModel.find({ postId: postId });
        return comments;
    } catch (error) {
        console.error(error);
    }
};

async function implementLike(commentId: string, comment__countLikes: number) {
    let result:boolean = false;
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

async function implementCommentCountInPost(PostId: string) {
    let result:boolean = false;
    let currentCommentCount: number | undefined = 0;

    try {
        let post = await PostModel.findById(PostId);
        if(post) {
            currentCommentCount = post?.comments;
        } else {
            console.error('post in not exists, check code');
        }
    } catch (error) {
        console.error(error);
    }

    currentCommentCount != undefined ? currentCommentCount += 1 : currentCommentCount = undefined;
    
    try {
        if(currentCommentCount != undefined) {
            await PostModel.findByIdAndUpdate( PostId, {
                $set: {
                    comments: currentCommentCount
                }
            })
            result = true;
        } else {
            console.error('Текущее значение кол-ва комментариев в этом посту is undefined');
        }
        return result;
    } catch (error) {
        console.error(error);
        return result;
    }
}

export {
    create, getAll, getById, implementLike
}