const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');
const AppError = require("../utils/errors/app-error");
const { SuccessResponse, ErrorResponse } = require('../utils/common');

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new AppError('Email and password are required', StatusCodes.BAD_REQUEST);
        }

        const user = await UserService.createUser({ email, password });
        SuccessResponse.data = user;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new AppError('Email and password are required', StatusCodes.BAD_REQUEST);
        }

        const token = await UserService.signInUser({ email, password });
        SuccessResponse.data = { token };
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
};

module.exports = {
    signup,
    signin,
};