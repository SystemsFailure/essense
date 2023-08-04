import { User, UserAttributes } from "../../../types/User.types";
import { createUser } from "../../database/actions/regisUser";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const user: User = body?.data;
        const siginUser: UserAttributes = await createUser(user);
        return {result: true, user: siginUser, };
    } catch (error) {
        return {error: error, result: false, user: {}};
    }
})