// Главный связующий модуль настроек вебсокета (socket.io)
const socketServer = require('./socket-server');
const socketDefault = require('./socket-default');
const socketAdmin = require('./socket-admin');


module.exports = {
    io: socketServer.io,
    socketServer,
    socketDefault,
    socketAdmin,
}