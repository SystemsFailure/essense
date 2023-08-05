const { io } = require('./socket-server');
const { messageActions, userActions } = require('../database/actions');
const LazyLoading = require('../tools/lazyloading');

// Промежуточное ПО по-умолчанию
io.use((socket, next) => {
    const userID = socket.handshake.auth.userID;
    const username = socket.handshake.auth.username;
    // Возврат ошибки на клиент
    if (!userID || !username) {
        return next(new Error('userID OR Username not found'));
    }
    socket.userID = userID;
    socket.username = username;
    next();
})

const users = [];
io.on('connection', (socket) => {
    console.log('connect!', socket.username);
    users.push(socket.userID);
    // Пример названия комнаты 'room_1688127235524'
    socket.join('room_' + socket.userID);
    // Отправка учетных данных на клиент при подключении
    socket.emit('first-connect', `Your credentials data: username: ${socket.username}, id: ${socket.userID}`);
    // Отправка списка пользователей при новом подключении
    io.emit('user', users);

    // Отправка сообщения между двумя User
    socket.on('send-message', (messageData) => {
        const {
            isReply,
            fromUsername,
            messageID,
            text,
            fromUserID,
            toUserID,
            replyToID,
            replyToContent,
            forwardedMessages,
            chatID } = messageData;

        // Создание обычного сообщения в БД
        if (isReply === false && !forwardedMessages.length) {
            messageActions.createMessage(messageID, text, fromUserID, toUserID, chatID)
                .then((response) => {
                    response.fromUsername = fromUsername;
                    io
                        .to('room_' + messageData.fromUserID)
                        .to('room_' + messageData.toUserID)
                        .emit('send-message', response);
                }).catch(err => {
                    socket.emit('requiest-error', err);
                })
        }
        // Создание reply-сообщения
        else if (isReply === true && !forwardedMessages.length) {
            messageActions.replyMessage(messageID, text, fromUserID, toUserID, replyToID, replyToContent, chatID)
                .then((response) => {
                    response.fromUsername = fromUsername;
                    io
                        .to('room_' + messageData.fromUserID)
                        .to('room_' + messageData.toUserID)
                        .emit('send-message', response);
                }).catch(err => {
                    socket.emit('requiest-error', err);
                })
        }
        // Создание сообщения, с пересылкой коллеции сообщений
        else if (forwardedMessages.length) {
            console.log('Создание сообщения, с пересылкой коллеции сообщений');
            messageActions.createForwardedMessage(
                messageID,
                text,
                fromUserID,
                toUserID,
                forwardedMessages,
                chatID
            ).then((response) => {
                response.fromUsername = fromUsername;
                io
                    .to('room_' + messageData.fromUserID)
                    .to('room_' + messageData.toUserID)
                    .emit('send-message', response);
            }).catch(err => {
                socket.emit('requiest-error', err);
            })
        }
    });

    // ПРОВЕРКА ВРЕМЕНЕМ!!!
    // Отправка reply-сообщения между двумя пользователями
    // socket.on('reply-message', (messageData) => {
    //     const { isReply, fromUsername, messageID, text, fromUserID, toUserID, replyToID, replyToContent, chatID } = messageData;
    //     // Создание сообщения в БД
    //     messageActions.replyMessage(messageID, text, fromUserID, toUserID, replyToID, replyToContent, chatID)
    //         .then((response) => {
    //             response.fromUsername = fromUsername
    //             io
    //                 .to('room_' + messageData.fromUserID)
    //                 .to('room_' + messageData.toUserID)
    //                 .emit('send-message', (response));
    //         }).catch(err => {
    //             socket.emit('requiest-error', err);
    //         })
    // });

    // Удаление сообщения
    socket.on('delete-message', (data) => {
        const { messagesID, fromUserID, toUserID } = data;
        messageActions.deleteMessagesAllUsers(messagesID).then(() => {
            io
                .to('room_' + fromUserID)
                .to('room_' + toUserID)
                .emit('delete-message');
        });
    })

    // Чтение сообщения
    const _ll = new LazyLoading(1500);
    socket.on('read-message', (data) => {
        // Получаем прочитанные сообщения по отдельности. Но так как их может быть очень много,
        // Используется ленивая подгрузка запросов к БД на основе небольшой временной задержки
        _ll.payload(data.message, (dataEntries) => {
            messageActions.readMessage(dataEntries).then(() => {
                io
                    .to('room_' + socket.userID)
                    .to('room_' + data.toUserID)
                    .emit('read-message', data);
            });
        });
    });

    // Пользователь печатает сообщение
    socket.on('write-message', (data) => {
        socket.to('room_' + data.toUserID).emit('write-message', data);
    })

    // Disconnect
    socket.on('disconnect', () => {
        console.log('disconnect: ', socket.username);
        users.splice(users.indexOf(socket.userID), 1);
        socket.broadcast.emit('user', users)
    })

});
