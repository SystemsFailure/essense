import { Comment } from "../../../types/Comment.types";
import { getAll } from "../../mongoose_database/actions/commentActions";


export default defineEventHandler(async (handler) => {
    const body = await readBody(handler);
    const comments:Comment[] | undefined = await getAll(body.postId);

    return {comments: comments != undefined ? comments : undefined };
})