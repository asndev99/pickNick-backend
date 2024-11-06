const { handleError } = require('../utils/responseHandlers');
const userRouter = require('./user');

const rootRouter = require('express').Router();

rootRouter.use('/user', userRouter);
rootRouter.all('*', (req, res, next) => {
    handleError(res, 404, null, 'Route Not Found');
});

module.exports = rootRouter;
