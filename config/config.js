require('dotenv').config();

module.exports = {
    ACCESS_SECRET: process.env.ACCESS_SECRET,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL
};
