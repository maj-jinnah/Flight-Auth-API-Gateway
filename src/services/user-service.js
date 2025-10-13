const { UserRepository } = require("../repositories");
const { StatusCodes } = require('http-status-codes');
const AppError = require("../utils/errors/app-error");
const bcrypt = require('bcryptjs');
const { Auth } = require('../utils/common')

const userRepository = new UserRepository();

const createUser = async (userData) => {
  try {
    const user = await userRepository.create(userData);
    return user;
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError('Cannot create a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const signInUser = async (data) => {
  try {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
      throw new AppError('No user found for the given email', StatusCodes.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Password is not valid', StatusCodes.BAD_REQUEST);
    }

    const jwtToken = Auth.createToken({ id: user.id, email: user.email });
    return jwtToken;

  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Something went wrong while signing in', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


module.exports = { createUser, signInUser };