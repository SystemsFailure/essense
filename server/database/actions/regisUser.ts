import { User as UserType } from "../../../types/User.types";
import { User } from "../models";

async function createUser(data: UserType) {
    const result = await User.create(data);
    return result;
}

export {
    createUser,
}