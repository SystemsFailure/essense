// Модуль действий пользователей
const sequelize = require('../connect');
const { Op } = require('sequelize');
const { User } = require('../models');

// Получение всех пользователей
async function getAllUsers(callback) {
    const transaction = await sequelize.transaction();
    try {
        const users = await User.findAll({
            attributes: { exclude: 'password' }
        });
        await transaction.commit();
        return callback(users);
    } catch (err) {
        await transaction.rollback();
        return callback(err);
    }
}

// Создание одного пользователя
async function createUser(id, username, email, friends = [], password, callback) {
    const transaction = await sequelize.transaction();
    try {

        const [user, created] = await User.findOrCreate({
            where: {
                [Op.and]: {
                    username: {
                        [Op.eq]: username
                    },
                    email: {
                        [Op.eq]: email
                    },
                    password: {
                        [Op.eq]: password
                    }
                }
            },
            defaults: {
                id,
                friends,
                username,
                email,
                password
            },
        })
        await transaction.commit();
        return callback({
            id: user.id,
            username: user.username,
            email: user.email,
            friends: user.friends,
        });
    } catch (err) {
        await transaction.rollback();
        return callback(err);
    }
}

module.exports = {
    createUser,
    getAllUsers,
}