const messageRouter = require('express').Router();
const { messageActions } = require('../database/actions');

// path:  /message
// Получить сообщения
messageRouter.get('/:userID/:chatID/:limit', (req, res) => {
    const { userID, chatID, limit } = req.params;
    messageActions.getMessages(chatID, userID, limit, (response) => {
        res.send({ messages: response.messages, done: response.done });
    })
})

// Поиск сообщения на которое ссылается ответное сообщение 
messageRouter.post('/find-message', (req, res) => {
    const { messageID, userID, chatID } = req.body;
    messageActions.findReplyingMessage(messageID, userID, chatID, (response) => {
        res.send(response);
    })
})

// Удаление сообщений у одного пользователя
messageRouter.post('/delete/', (req, res) => {
    const { messagesID, isAllUsers, userID } = req.body;
    if (isAllUsers === 'false') {
        messageActions.deleteMessagesUser(messagesID, userID, (response) => {
            res.send(response);
        })
    }
    else {
        messageActions.deleteMessagesAllUsers(messagesID).then(() => {
            res.send(true);
        });
    }
})


// ПРОВЕРИТЬ
// Создать сообщение
// messageRouter.post('/create/', (req, res) => {
//     const { chatID, text, messageID, fromUserID, toUserID, createdAt } = req.body;
//     messageActions.createMessage(messageID, text, fromUserID, toUserID, createdAt, chatID, (response) => {
//         messageEvent.emit('send-message', response.message.text)
//         res.send(response.message);
//     })
// })


// ПРОВЕРИТЬ
// Прочитать сообщение
// messageRouter.post('read', (req, res) => {
//     const { messageID } = req.body;
//     messageActions.readMessage(messageID, (response) => {

//     })
// })

module.exports = messageRouter;