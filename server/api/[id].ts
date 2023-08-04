import { User, UserAttributes } from "../../types/User.types";
import { getUser } from "../database/actions/getUser";

export default defineEventHandler(async(event) => {
    const id: string | undefined = event?.context?.params?.id;
    console.log(id, 'userIdInstance');
    
    let user: User | undefined = undefined;
    
    if(id != undefined) {
        user = await getUser(id);
        console.log(user, 'userInstance');
        
    }
    return { response: user }
})