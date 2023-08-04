import { getUsers } from "../../database/actions/getAllUsers";
import { User } from "../../../types/User.types";

export default defineEventHandler(async (handler) => {
    const users: User[] | boolean | undefined = await getUsers();
    return {
        users: users,
    }
})