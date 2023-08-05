// Пространство имен для сокетов администрации
const { io } = require('./socket-server');

const adminSocket = io.of('/admin');

// Промежуточное ПО для админ-сокетов
adminSocket.use((admin, next) => {
    next();
})

module.exports = {
    adminSocket
};