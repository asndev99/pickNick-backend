const { User, userOTP } = require('../../models');
const { BadRequestError } = require('../../utils/customErrors');
const { generateOtp, hashPassword, generateToken } = require('../../utils/helpers/helper');
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
const userLogin = (req, res, next) => {
    try {
    } catch (error) {
        console.log('Error in user logging ', error);
        next(error);
    }
};

module.exports = {
    userSignup,
    userLogin,
    verifyOTP
};
