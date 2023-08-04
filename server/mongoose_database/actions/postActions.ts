import { Post, PostForCreate } from "../../../types/Post.types";
import { PostModel } from "../models/Post.model";

async function getById(id: string) : Promise<PostForCreate  | boolean | null | undefined>{
    try {
        if(id != undefined) {
            const post: PostForCreate | null = await PostModel.findById(id);
            return post;
        }
    } catch (error) {
        console.error(error)
        return false;
    }
} 

export {
    getById,
}