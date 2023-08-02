import { PostModel } from "../models/Post.model";

async function getById(id: string) {
    try {
        if(id != undefined) {

            const post = await PostModel.findById(id);
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