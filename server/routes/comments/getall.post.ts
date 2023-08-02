import { getAll } from "../../mongoose_database/actions/commentActions";


export default defineEventHandler(async (handler) => {
    const body = await readBody(handler);
    const comments = await getAll(body.postId);

    return {comments: comments};
})