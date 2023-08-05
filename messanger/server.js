const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');
// const { Server } = require('socket.io');
const mainRouter = require('./router/');
const userRouter = require('./router/user');
const messageRouter = require('./router/message');
const chatRouter = require('./router/chat');
const database = require('./database');
const websocket = require('./websocket');

app.set('port', process.env.PORT || 8080);
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// CORS
app.use(cors(corsOptions));
// Маршруты
app.use('/', mainRouter);
app.use('/users', userRouter);
app.use('/chats', chatRouter);
app.use('/message', messageRouter);

server.listen(app.get('port'), () => {
    console.log(`Express Server has been start on: http://localhost:${app.get('port')}`);
});