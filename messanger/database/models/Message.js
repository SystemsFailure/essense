// Таблица СООБЩЕНИЙ
const { DataTypes } = require('sequelize');
const sequelize = require('../connect');

const Message = sequelize.define('message', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    text: { type: DataTypes.TEXT },
    fromUserID: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    toUserID: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    replyToID: {
        type: DataTypes.UUID,
        defaultValue: null,
    },
    replyToContent: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    /* пример единицы коллекции: { 
        id: 123456789,  - ID сообщения которое пересылается
        content: 'exapmle text',  - содержимое собщения которое переылается
        authorName: john123,  - Никнейм пользователя создавшего сообщение
        authorID: 123456789,  - ID этого пользователя
        replyToID,  - ID Сообщения ответом на которое являлось данное пересланное сообщение (Если есть) 
        replyToContent  - Содержимое сообщения на которое ссылался ответ (Если есть)
        forwardedID  - ID сообщения которое также является коллекцией других сообщений (Если есть)
    }*/
    forwardedMessages: {
        // Только для PostgreSQL!!!
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: [],
        // defaultValue: [{
        //     id: null,
        //     content: null,
        //     authorName: null,
        //     authorID: null,
        //     replyToID: null,
        //     replyToContent: null,
        //     forwardedMsg: [],
        // }]
    }
}, {
    timestamps: true,
    updatedAt: false,
    createdAt: true,
    paranoid: true,
})

module.exports = Message;

