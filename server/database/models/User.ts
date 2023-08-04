import { UserAttributesInput, UserAttributes } from '../../../types/User.types';
import { DataTypes, Model} from 'sequelize';
import sequelize from '../connect';


class User extends Model<UserAttributes, UserAttributesInput> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    declare public password: string;
    declare public friends: [];

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
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

}, {
    timestamps: true,
    paranoid: true,
    sequelize: sequelize,
})


export default User;