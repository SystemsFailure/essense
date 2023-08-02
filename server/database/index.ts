import sequelize from "./connect";
import { User } from './models';

( async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
} )

export default async() => {
    User.sync({ force: false });
    console.log('Connection has been established successfully with postgres');
}


