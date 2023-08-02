import { PostWithoutId } from "../../../types/Post.types";
import create from "../../mongoose_database/actions/createPost";


export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const post: PostWithoutId = body?.data;
    
    const result = await create(post);
    console.log(post, 'post', result, 'created');

    return { result }
})
