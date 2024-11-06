const userRouter = require('express').Router();
const userAuthRouter = require('./user.auth.router');

userRouter.use('/auth', userAuthRouter);

module.exports = userRouter;
