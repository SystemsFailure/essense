import { PostModel } from "../models/Post.model";

export default async function findByUserId(userId: string) {
    try {
        const posts = await PostModel.find({
            userId: userId
        })
        return {posts: posts, result: true};
    } catch (error) {
        return {result: false, error: error}
    }
}