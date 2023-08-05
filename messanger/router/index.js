const mainRouter = require('express').Router();

mainRouter.get('/', (req, res, next) => {
    res.send('Main');
})

module.exports = mainRouter;