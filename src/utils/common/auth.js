const jwt = require('jsonwebtoken');
const {ServerConfig} = require('../../config')

const createToken = (data) =>{
    try {
        return jwt.sign(data, ServerConfig.JWT_SECRET, { expiresIn: ServerConfig.JWT_EXPIRY });
    } catch (error) {
        throw new Error('Error creating token');
    }
}

module.exports = {
    createToken,
}; 