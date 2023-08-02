import find from "../../mongoose_database/actions/getAllPosts";
export default defineEventHandler(async (event) => {
    const response = await find();
    if(!response.result) throw new Error('Invalid response from find posts');
    return {response: response.result ? response.posts : response.error};
})