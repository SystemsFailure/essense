import { getById } from "../../mongoose_database/actions/postActions";
import {PostForCreate} from '../../../types/Post.types'
export default defineEventHandler(async (handler) => {
    const body = await readBody(handler);
    let post: PostForCreate | boolean | null | undefined;
    if(body.postId) {
        post = await getById(body.postId);
    }
    return {
        post: post
    }
})