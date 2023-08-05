// Связующий модуль MODELS
const { DataTypes } = require('sequelize');
const sequelize = require('../connect');
const User = require('./User');
const Chat = require('./Chat');
const Message = require('./Message');

const userChat = sequelize.define('userChat', {
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

Chat.belongsToMany(User, { through: userChat });
User.belongsToMany(Chat, { through: userChat });


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


module.exports = {
    User,
    Chat,
    Message,
    userChat,
}