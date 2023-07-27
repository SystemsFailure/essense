import sequelize from "./connect";
import { User } from './models';

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})

// Создание таблицы
async function TableCreate() {
    await User.sync({force: false});
}
async function createUser(username: string, email: string) {
    await User.create({
        username,
        email
    })
}

async function getUsers() {
    return await User.findAll();
}

async function getUser(id: any) {
    if(id !== undefined){
        try {
            return await User.findOne({
                where: {id: id}
            })
        } catch (error) {console.error('Unable to get user:', error);}
    }
}
export {
    TableCreate,
    createUser,
    getUsers,
    getUser
};