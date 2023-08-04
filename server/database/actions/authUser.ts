import { UserAttributes, UserForAuth, User as UserType } from "../../../types/User.types";
import { User } from "../models";



export default async function auth(data: UserForAuth) : Promise<UserType | null | undefined> {
    
    try {
        const user: UserType | null = await User.findOne({
            where: {
                email: data.email,
                username: data.username,
                password: data.password,
            }
        });
        return user;
    } catch (error) {
        console.error(error);
    }
}