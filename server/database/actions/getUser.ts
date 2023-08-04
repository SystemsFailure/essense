import { User as UserAtt } from "../../../types/User.types";
import { User as UserModel } from "../models";
async function getUser (id_:string) {
    let User_: UserAtt | null = await UserModel.findByPk(id_);
    console.log(User_, 'User_ instance');
    
    if(User_) {
        return User_;
    } else {
        console.error("User not found");
        return;
    }
}

export {
    getUser,
}