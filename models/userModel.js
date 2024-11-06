const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            default: null,
            required: false
        },
        lastName: {
            type: String,
            default: null,
            required: false
        },
        location: {
            type: String,
            default: null,
            required: false
        },
        city: {
            type: String,
            default: null,
            required: false
        },
        state: {
            type: String,
            default: null,
            required: false
        },
        gender: {
            type: String,
            enum: ['male', 'female'],
            required: false
        },
        dob: {
            type: Date,
            default: null,
            required: false
        },
        latitude: {
            type: Number,
            default: null,
            required: false
        },
        longitude: {
            type: Number,
            default: null,
            required: false
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: false
        },
        isProfileCompleted: {
            type: Boolean,
            default: false
        },
        fcmToken: {
            type: String,
            required: false
        },
        isNotify: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
