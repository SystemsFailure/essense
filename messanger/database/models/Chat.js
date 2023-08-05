// Таблица ЧАТ
const { DataTypes } = require('sequelize');
const sequelize = require('../connect');

const Chat = sequelize.define('chat', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
}, {
    timestamps: true,
    updatedAt: true,
    createdAt: true,
})

module.exports = Chat;