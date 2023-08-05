const server = require('http').createServer();
const { Server } = require('socket.io');
// Сервер запускающий соединение вебсокета
const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:3000',
            'http://localhost:3001', 
            'http://localhost:3002',
        ],
        allowEIO3: true,
        methods: ['POST, DELETE, GET, PUT'],
        credentials: false,
    },
})

server.listen(4123, () => {
    console.log(`Socket.IO Server has been start on: http://localhost:4124`);
});

module.exports = {
    io
};