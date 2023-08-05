// Модуль действий для сообщений
const sequelize = require('../connect');
const { Op } = require('sequelize');
const { Chat, User, Message } = require('../models');

// Получить сообщения.  userID - id того кто запрашивает сообщения
async function getMessages(chatID, userID, limit, callback) {
    const transaction = await sequelize.transaction();
    const where = {
        chatID,
        [Op.or]: [
            { fromUserID: { [Op.eq]: userID } },
            { toUserID: { [Op.eq]: userID } },
        ]
    }
    try {
        const amount = await Message.count({
            where
        })
        // Если общее кол-во вхождений в таблицу больше запрашиваемого лимита сообщений
        if (amount >= limit) {
            const messages = await Message.findAll({
                where,
                offset: amount - limit,
                order: [['id', 'ASC']],
            });
            await transaction.commit();
            return callback({ messages, done: false });
        } else {
            // Если запрашиваемый лимит больше чем общее кол-во сообщений, то будут возвращены все 
            // сообщения
            const offset = limit - amount;
            if (offset >= 0) {
                const messages = await Message.findAll({
                    where,
                    offset: 0,
                    order: [['id', 'ASC']],
                });
                await transaction.commit();
                return callback({ messages, done: true });
            }
        }
    } catch (err) {
        callback(err);
        console.log(err);
        await transaction.rollback();
    }
}

// Поиск сообщения на которое ссылается ответное сообщение 
async function findReplyingMessage(messageID, userID, chatID, callback) {
    const transaction = await sequelize.transaction();
    try {
        const findMessage = await Message.findByPk(messageID);
        const amount = await Message.count({
            where: {
                chatID,
                createdAt: {
                    [Op.and]: [
                        { [Op.gte]: findMessage.createdAt },
                        { [Op.lt]: Date.now() }
                    ]
                }

            }
        })
        await transaction.commit();
        getMessages(chatID, userID, amount + 5, async (response) => {
            response.foundMessageID = messageID;
            callback(response);
        })
    } catch (err) {
        await transaction.rollback();
    }
}

// Получить все НЕПРОЧИТАННЫЕ сообщения
async function getNotReadMessages(chatID, callback) {
    const transaction = await sequelize.transaction();
    try {
        const chat = await Chat.findByPk(chatID);
        const messages = await chat.getMessages({
            where: {
                isRead: {
                    [Op.eq]: false
                }
            }
        })
        callback(messages)
        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        return callback(err);
    }
}

// Создает сообщение. Если чата еще не существовало, сначала создает его, потом добавляет сообщение в него
async function createMessage(messageID, text, fromUserID, toUserID, chatID) {
    const transaction = await sequelize.transaction();
    try {
        const [chat, created] = await Chat.findOrCreate({
            where: {
                id: chatID
            },
            defaults: {
                id: chatID,
            }
        })
        if (created) {
            const firstUser = await User.findByPk(fromUserID);
            const secondUser = await User.findByPk(toUserID);
            await chat.addUsers([firstUser, secondUser]);
        }
        const message = await chat.createMessage({
            id: messageID,
            text,
            fromUserID,
            toUserID,
        });
        await transaction.commit();
        return { fromUserID, toUserID, created, chatID, message }
    } catch (err) {
        console.log(err);
        await transaction.rollback();
    }
}

// Создает новое сообщение, с ответом на указанное сообщение
async function replyMessage(messageID, text, fromUserID, toUserID, replyToID, replyToContent, chatID) {
    const transaction = await sequelize.transaction();
    try {
        const chat = await Chat.findByPk(chatID);
        const message = await chat.createMessage({
            id: messageID,
            text,
            fromUserID,
            toUserID,
            replyToID,
            replyToContent,
        });
        await transaction.commit();
        return { fromUserID, toUserID, created: false, chatID, message }
    } catch (err) {
        await transaction.rollback();
    }
}

// Создает сообщение с прикрепленной коллекцией сообщений (пересланные сообщения) 
/* пример единицы коллекции: { 
    id: 123456789,  - ID сообщения которое пересылается
    content: 'exapmle text',  - содержимое собщения которое переылается
    authorName: john123,  - Никнейм пользователя создавшего сообщение
    authorID: 123456789,  - ID этого пользователя
    replyToID: 123456789,  - ID Сообщения ответом на которое являлось данное пересланное сообщение (Если есть) 
    replyToContent: 'exapmle text'  - Содержимое сообщения на которое ссылался ответ (Если есть)
    forwardedMsg: []  - Коллекция сообщений которую содержит текущая единица коллекции (Если есть)
}*/
async function createForwardedMessage(
    messageID,
    text,
    fromUserID,
    toUserID,
    forwardedMessages,
    chatID ) {
    const transaction = await sequelize.transaction();
    try {
        // Создать чат если его не существовало
        const [chat, created] = await Chat.findOrCreate({
            where: {
                id: chatID
            },
        })
        if (created) {
            const firstUser = await User.findByPk(fromUserID);
            const secondUser = await User.findByPk(toUserID);
            await chat.addUsers([firstUser, secondUser]);
        }
        // Создать сообщение через чат
        const message = await chat.createMessage({
            id: messageID,
            text,
            fromUserID,
            toUserID,
            forwardedMessages,
        });
        await transaction.commit();
        return { fromUserID, toUserID, created, chatID, message }
    } catch (err) {
        await transaction.rollback();
    }
}

// Мягкое удаление сообщений У ОДНОГО ПОЛЬЗОВАТЕЛЯ
async function deleteMessagesUser(messagesID, userID, callback) {
    const transaction = await sequelize.transaction();
    try {
        const messages = await Message.findAll({
            where: {
                id: {
                    [Op.in]: messagesID
                }
            },
        })
        const response = { deletedMessages: [], force: false };
        for (const message of messages) {
            if (message.fromUserID == userID) {
                response.deletedMessages.push(message);
                message.update({ fromUserID: null });
            }
            if (message.toUserID == userID) {
                response.deletedMessages.push(message);
                message.update({ toUserID: null });
            }
        }
        callback(response);
        await transaction.commit();
    } catch (err) {
        console.log(err);
        await transaction.rollback();
    }
}

// Мягкое удаление сообщений У ОБОИХ/ВСЕХ ПОЛЬЗОВАТЕЛЕЙ ЧАТА
async function deleteMessagesAllUsers(messagesID) {
    const transaction = await sequelize.transaction();
    try {
        await Message.destroy({
            where: {
                id: {
                    [Op.in]: messagesID
                }
            },
        })
        await transaction.commit();
    } catch (err) {
        console.log(err);
        await transaction.rollback();
    }
}

// Задает сообщению состояние прочитанного
async function readMessage(messagesID) {
    const transaction = await sequelize.transaction();
    try {
        await Message.update({ isRead: true }, {
            where: {
                id: {
                    [Op.in]: messagesID
                }
            }
        })
        await transaction.commit();
        // КОД ДЛЯ ПРИМЕРА
        // const messages = await Message.findAll({
        //     where: {
        //         id: {
        //             [Op.in]: messageID
        //         }
        //     }
        // })
        // messages.forEach(async(message) => {
        //     await Message.update({ isRead: true }, {
        //         where: {
        //             id: message.id
        //         }
        //     });
        // })

    } catch (err) {
        await transaction.rollback();
    }
}

module.exports = {
    createMessage,
    replyMessage,
    createForwardedMessage,
    getMessages,
    findReplyingMessage,
    getNotReadMessages,
    deleteMessagesUser,
    deleteMessagesAllUsers,
    readMessage,
}
