import { getById } from "../../mongoose_database/actions/postActions"
export default defineEventHandler(async (handler) => {
    const body = await readBody(handler);
    let post = undefined;
    if(body.postId) {
        post = await getById(body.postId);
    }
    return {
        post: post
    }
})