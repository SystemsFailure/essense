import { Optional } from "sequelize";

type User = {
    id: number,
    username: string,
    email: string,
    password: string,
    friends: [],
};


interface UserAttributes {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    friends?: [];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

interface UserAttributesInput extends Optional<UserAttributes, 'id'> {}


interface UserForAuth {
    data: {
        email: string;
        password: string;
        username: string;
    }
}

interface returnTypeObject {
    result: boolean,
    user: UserAttributes | undefined | null,
}

export {
    User,
    UserAttributesInput,
    UserAttributes,
    UserForAuth,
    returnTypeObject,
}