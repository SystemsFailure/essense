import { PostWithoutId } from "../../../types/Post.types";
import { PostModel } from "../models/Post.model";


async function create(data: PostWithoutId) {
    
    try {
        await PostModel.create(
            data
        );
        console.log('success', data);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }

}

export default create;