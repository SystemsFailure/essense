const userRouter = require('express').Router();
const { userActions } = require('../database/actions');
const { checkResponseDB } = require('../handlerError');
// Сокет-подключение
const { io } = require('../websocket/index');

// Получение всех пользователей
userRouter.get('/', (req, res) => {
    userActions.getAllUsers((response) => {
        res.send(checkResponseDB(response));
    });
})

// Создание Нового пользователя
userRouter.post('/create-user', async (req, res) => {
    const user = req.body;
    await userActions.createUser(
        user.id, 
        user.username, 
        user.email, 
        user.friends, 
        user.password, 
        (response) => {
        res.send(checkResponseDB(response));
    });
})

module.exports = userRouter;