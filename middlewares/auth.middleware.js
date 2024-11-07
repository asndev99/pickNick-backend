const { ACCESS_SECRET } = require('../config/config');
const { User } = require('../models');
const { UnauthorizedError } = require('../utils/customErrors');
const jwt = require('jsonwebtoken');
module.exports = {
    verifyToken: async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new UnauthorizedError('Please login to continue');
            }

            const token = authHeader.split('Bearer ')[1];
            const data = jwt.verify(token, ACCESS_SECRET);
            const user = await User.findById({ _id: data.id });

            if (!user) {
                throw new UnauthorizedError('Please login to continue');
            }

            req.user = user;
            next();
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                next(new UnauthorizedError('Please login to continue'));
            } else {
                next(error);
            }
        }
    }
};
