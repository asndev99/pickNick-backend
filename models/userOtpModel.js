const mongoose = require('mongoose');

const userotpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true
        },
        otp: {
            type: String,
            unique: true
        },
        expiresAt: {
            type: Date,
            default: () => new Date(Date.now() + 60 * 1000),
            index: { expires: '1m' }
        }
    },
    { timestamps: true }
);

const userOTP = mongoose.model('userOTP', userotpSchema);
module.exports = userOTP;
