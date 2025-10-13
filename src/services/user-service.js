const { UserRepository } = require("../repositories");
const { StatusCodes } = require('http-status-codes');
const AppError = require("../utils/errors/app-error");

const userRepository = new UserRepository();

const createUser = async (userData) => {
  try {
    const user = await userRepository.create(userData);
    return user;
  } catch (error) {
    if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError('Cannot create a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = { createUser };