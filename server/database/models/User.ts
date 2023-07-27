import sequelize from '../connect';
import { DataTypes } from 'sequelize';

const User = sequelize.define('Users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

export default User;