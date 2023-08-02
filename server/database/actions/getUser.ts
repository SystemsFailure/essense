import { Model } from "sequelize";
import { User as UserModel } from "../models";
async function getUser (id_:string) {
    let User: Model<any, any> | null = await UserModel.findByPk(id_);
    return User? User : undefined;
}

export {
    getUser,
}