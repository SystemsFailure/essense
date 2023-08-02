import { implementLike } from "../../mongoose_database/actions/commentActions"

export default defineEventHandler(async (handler) => {
    const body = await readBody(handler);
    console.log(body, 'body');
    let response = false;
    response = await implementLike(body.data.commentId, body.data.countLikes);

    return {
        response: response
    }
})