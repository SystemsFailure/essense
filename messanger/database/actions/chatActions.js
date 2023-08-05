// Модуль действий для чатов
const sequelize = require('../connect');
const { Chat, User } = require('../models');
const messageActions = require('./messageActions');


// Получение чатов пользователя
async function getUserChats(userID, callback) {
    const transaction = await sequelize.transaction();
    try {
        const user = await User.findByPk(userID);
        const userChats = [];
        for (const entryChat of await user.getChats()) {
            for (const entryUser of await entryChat.getUsers({ attributes: ['id', 'username'], joinTableAttributes: ['chatId'] })) {
                if (userID !== entryUser.id) {
                    userChats.push({
                        userID: entryUser.id,
                        username: entryUser.username,
                        chatID: entryUser.userChat.chatId,
                    });
                }
            }
        }
        // Получение последнего сообщения для всех чатов.
        const chats = [];
        for (const chat of userChats) {
            await messageActions.getMessages(chat.chatID, userID, 1, (response) => {
                chat.lastChangeTime = new Date(response.messages[0].createdAt) || null;
                chat.lastMessage = response.messages[0] || null;
                chats.push(chat);
            })
        }
        // Сортировка чатов по времени последнего изменения
        chats.sort((a, b) => {
            if(a.lastChangeTime > b.lastChangeTime) return -1;
            if(a.lastChangeTime < b.lastChangeTime) return 1;
            if(a.lastChangeTime === b.lastChangeTime) return 0;
        });
        callback(chats);
        await transaction.commit();
    } catch (err) {
        callback(err);
    }
}

// Создание Чата для ДВУХ ПОЛЬЗОВАТЕЛЕЙ
async function createChat(id, firstUserID, secondUserID, createdAt, callback) {
    const transaction = await sequelize.transaction();
    try {
        const firstUser = await User.findByPk(firstUserID);
        const secondUser = await User.findByPk(secondUserID);

        const newChat = await Chat.create({
            id,
            createdAt,
        });
        await newChat.addUsers([firstUser, secondUser]);
        await transaction.commit();
        return callback('success');
    } catch (err) {
        await transaction.rollback();
        return callback(err);
    }
}

module.exports = {
    createChat,
    getUserChats
}