// Связующий модуль MODELS
import { DataTypes } from 'sequelize';
import sequelize from '../connect';
import User from './User';
import Chat from './Chat';
import Message from './Message';

const UserChat = sequelize.define('userChat', {
    chatId: {
        type: DataTypes.UUID,
        references: {
            model: Chat,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        }
    }
}, { timestamps: false })

Chat.belongsToMany(User, { through: UserChat });
User.belongsToMany(Chat, { through: UserChat });


Chat.hasMany(Message, {
    foreignKey: {
        name: 'chatID'
    }
});
Message.belongsTo(Chat, {
    foreignKey: {
        name: 'chatID'
    }
});


export {
    User,
    Chat,
    Message,
    UserChat,
}