const chatRouter = require('express').Router();
const { chatActions } = require('../database/actions/')
const { checkResponseDB } = require('../handlerError');

// Создание чата двух пользователей
chatRouter.post('/create-chat', (req, res) => {
    const newChat = Object.values(req.body);
    chatActions.createChat(
        ...newChat,
        (response) => {
        res.send(checkResponseDB(response))
    });
})

// Получение чатов пользователя
chatRouter.get('/get-chats/:userID', (req, res) => {
    const userID = req.params.userID; 
    chatActions.getUserChats(userID, (userChats) => {
        res.send(checkResponseDB(userChats));
    });
})

module.exports = chatRouter;