import { getUser } from "../../database";
export default defineEventHandler(async event => {
    const query = getQuery(event);
    return { user: await getUser(query.id) };
})




