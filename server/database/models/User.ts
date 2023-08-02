import sequelize from '../connect';
import { DataTypes } from 'sequelize';

const User = sequelize.define('Users', {
    id_: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
    },
    id: {
       type: DataTypes.INTEGER,
       defaultValue: '0',
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        defaultValue: 'empty',
        allowNull: false,
    },
    friends: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: []
    },
})

export default User;