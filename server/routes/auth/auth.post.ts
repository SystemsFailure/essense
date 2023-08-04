import { UserAttributes, UserForAuth, User as UserType } from "../../../types/User.types";
import auth from "../../database/actions/authUser";


export default defineEventHandler(async (handler) =>{
    try {
        const body : UserForAuth = await readBody(handler);
        
        const user: UserType | null | undefined = await auth(body);
        return {user: user};
    } catch (error) {
        console.error(error);
    }
})