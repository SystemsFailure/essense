import { PostModel } from "../models/Post.model";

export default async function find (){

    try {
        const posts = await PostModel.find().limit(10);
        return {posts: posts, result: true};
    } catch (error) {
        return { error: error, result: false }
    }

}
