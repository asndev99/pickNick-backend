const { User, userOTP } = require('../../models');
const { BadRequestError } = require('../../utils/customErrors');
const { generateOtp, hashPassword, generateToken, comparePassword } = require('../../utils/helpers/helper');
const { handleError, okResponse } = require('../../utils/responseHandlers');

const userSignup = async (req, res, next) => {
    try {
        const { email } = req.body;
        const existUser = await User.findOne({
            email
        });

        if (existUser) {
            throw new BadRequestError('User with this email already exists');
        }

        const otp = generateOtp();
        const newOTP = await userOTP.findOneAndUpdate(
            { email },
            { otp },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
        );
        //have to attahch nodemailer
        setTimeout(() => {
            userOTP
                .findOneAndDelete({ email: newOTP.email, otp: newOTP.otp })
                .then((data) => {
                    console.log('OTP deleted');
                })
                .catch((error) => {
                    console.log('Error in deletion of otp');
                });
        }, 60000);
        okResponse(res, 200, newOTP.otp, 'An 4 digit otp has been sent to your email');
    } catch (error) {
        next(error);
    }
};

const resendOTP = async (req, res, next) => {
    try {
        const { email } = req.body;
        const otp = generateOtp();
        const newOTP = await userOTP.findOneAndUpdate(
            { email },
            { otp },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
        );
        //have to attahch nodemailer
        setTimeout(() => {
            userOTP
                .findOneAndDelete({ email: newOTP.email, otp: newOTP.otp })
                .then((data) => {
                    console.log('OTP deleted');
                })
                .catch((error) => {
                    console.log('Error in deletion of otp');
                });
        }, 60000);
        okResponse(res, 200, newOTP.otp, 'An 4 digit otp has been sent to your email');
    } catch (error) {
        console.log('Error in resend otp', error);
        next(error);
    }
};

const verifyOTP = async (req, res, next) => {
    try {
        const { email, password, otp } = req.body;
        const dbOTP = await userOTP.findOne({ email, otp });

        if (!dbOTP) {
            throw new BadRequestError('Invalid OTP,or expired');
        }

        const hashedPassword = hashPassword(password);
        const user = await User.create({
            email,
            password: hashedPassword
        });
        const token = generateToken(user._id, 'USER');
        okResponse(res, 200, user, 'OTP verified now please complete your profile to continue', token);
    } catch (error) {
        next(error);
    }
};

const completeProfile = async (req, res, next) => {
    try {
        const { email } = req.user;
        const user = await User.findOneAndUpdate(
            { email },
            {
                ...req.body,
                latitude: Number(req.body.latitude),
                longitude: Number(req.body.longitude),
                dob: new Date(req.body.dob),
                isProfileCompleted: true
            },
            { new: true }
        );
        okResponse(res, 200, user, 'Profile Completed Successfully');
    } catch (error) {
        console.log('Error in user complete profile', error);
        next(error);
    }
};

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new BadRequestError('Invalid Credentials');
        }
        if (!comparePassword(password, user.password)) {
            throw new BadRequestError('Invalid Credentials');
        }

        const token = generateToken(user._id, 'USER');
        okResponse(res, 200, user, 'Successfully logged in', token);
    } catch (error) {
        console.log('Error in user logging ', error);
        next(error);
    }
};

module.exports = {
    userSignup,
    userLogin,
    resendOTP,
    verifyOTP,
    completeProfile
};
