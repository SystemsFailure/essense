import { User as UserType } from "../../../types/User.types";
import { User } from "../models";

async function getUsers() : Promise<UserType[] | undefined | boolean> {
    try {
        const users: UserType[] = await User.findAll();
        return users;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export {
    getUsers
}