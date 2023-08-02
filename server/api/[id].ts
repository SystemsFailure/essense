import { getUser } from "../database/actions/getUser";

export default defineEventHandler(async(event) => {
    const id:string | undefined = event.context.params?.id;
    
    let user = undefined;
    console.log(event.context.params?.id)
    if(id != undefined) {
        user = await getUser(id);
    }
    return { response: user }
})