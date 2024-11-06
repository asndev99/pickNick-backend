const signupSchema = require('../../schema/user/auth/signupSchema');
const validateSchema = require('../../utils/helpers/validateSchema');
const userAuthController = require('../../controller/user/user.authController');
const verifyOTPSchema = require('../../schema/user/auth/verifyOTPschema');

const userAuthRouter = require('express').Router();

userAuthRouter.post('/signup', validateSchema(signupSchema), userAuthController.userSignup);
userAuthRouter.post('/verify-otp', validateSchema(verifyOTPSchema), userAuthController.verifyOTP);

module.exports = userAuthRouter;
