import { getUsers } from "../../database";
export default defineEventHandler(async (event) => {
    return { users: await getUsers() }
})