const dotenv = require("dotenv")

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 3000,
    BASE_URL: process.env.BASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    SALT_ROUNDS:  parseInt(process.env.SALT_ROUNDS),
    JWT_EXPIRY: process.env.JWT_EXPIRY,
}