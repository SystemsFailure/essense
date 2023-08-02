import { Post } from "../../../types/Post.types";
import findByUserId from "../../mongoose_database/actions/getPostsBuUserId";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const userId = body.userId;
    let posts = undefined;
    if(userId) {
        const response = await findByUserId(userId);
        if(response) {
            posts = response.posts;
        } else {
            throw new Error('Could not find');
        }
    } else {
        throw new Error('userid not defined');
    }

    return {response: posts};
})