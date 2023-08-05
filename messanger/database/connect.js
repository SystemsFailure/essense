const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('essense_messenger', 'postgres', '31415', {
    host: 'localhost',
    dialect: 'postgres',
    logging: true,
    timezone: '+03:00'
});

module.exports = sequelize;

