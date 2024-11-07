const signupSchema = require('../../schema/user/auth/signupSchema');
const validateSchema = require('../../utils/helpers/validateSchema');
const userAuthController = require('../../controller/user/user.authController');
const verifyOTPSchema = require('../../schema/user/auth/verifyOTPschema');
const { verifyToken } = require('../../middlewares/auth.middleware');
const createProfileSchema = require('../../schema/user/auth/createProfileSchema');
const loginSchema = require('../../schema/user/auth/loginSchema');
const resendOTPSchema = require('../../schema/user/auth/resendOTPSchema');

const userAuthRouter = require('express').Router();

userAuthRouter.post('/signup', validateSchema(signupSchema), userAuthController.userSignup);
userAuthRouter.post('/resend-otp', validateSchema(resendOTPSchema), userAuthController.resendOTP);

userAuthRouter.post('/verify-otp', validateSchema(verifyOTPSchema), userAuthController.verifyOTP);
userAuthRouter.post('/complete-profile', verifyToken, validateSchema(createProfileSchema), userAuthController.completeProfile);
userAuthRouter.post('/login', validateSchema(loginSchema), userAuthController.userLogin);
module.exports = userAuthRouter;
