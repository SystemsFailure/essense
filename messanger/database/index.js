const sequelize = require('./connect');
const { User, Chat, Message, userChat } = require('./models');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection established');
    } catch (err) {
        console.log('Unable to connect to the database: ', err);
    }
})();

// Message.sync({ alter: true });
// Chat.sync({force: true});

// sequelize.sync({force: true});