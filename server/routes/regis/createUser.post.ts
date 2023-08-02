import { User } from "../../../types/User.types";
// import {regis} from '../../mongoose_database/actions/registerUser';
import { createUser } from "../../database/actions/regisUser";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const user: User = body?.data;
        const siginUser = await createUser(user);
        return {result: true, user: siginUser, };
    } catch (error) {
        return {error: error, result: false, user: {}};
    }
})