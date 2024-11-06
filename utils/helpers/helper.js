const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ACCESS_SECRET } = require('../../config/config');
module.exports = {
    generateOtp() {
        const now = Date.now().toString();
        return now.slice(-4);
    },

    hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    },
    generateToken(id, role) {
        return jwt.sign({ id, role }, ACCESS_SECRET, { expiresIn: '7d' });
    }
};
