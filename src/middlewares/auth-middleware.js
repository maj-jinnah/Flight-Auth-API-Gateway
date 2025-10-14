const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const AppError = require("../utils/errors/app-error");
const { UserService } = require('../services');


const checkAuth = async (req, res, next) => {
    try {
        const encodedToken = req.headers['authorization'];
        if (!encodedToken) {
            throw new AppError('Unauthorized access', StatusCodes.BAD_REQUEST);
        }

        const token = encodedToken.split(' ')[1];
        const user = await UserService.isAuthenticated(token);
        if (!user) {
            throw new AppError('User not found', StatusCodes.NOT_FOUND);
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Internal Server Error'
        });
    }
};

module.exports = { checkAuth };