const jwt = require('jsonwebtoken');
const {ServerConfig} = require('../../config')

const createToken = (data) =>{
    try {
        return jwt.sign(data, ServerConfig.JWT_SECRET, { expiresIn: ServerConfig.JWT_EXPIRY });
    } catch (error) {
        throw new Error('Error creating token');
    }
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, ServerConfig.JWT_SECRET);
    } catch (error) {
        throw new Error('Error verifying token');
    }
}

module.exports = {
    createToken,
    verifyToken,
}; 