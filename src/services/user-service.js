const { UserRepository, RoleRepository } = require("../repositories");
const { StatusCodes } = require('http-status-codes');
const AppError = require("../utils/errors/app-error");
const bcrypt = require('bcryptjs');
const { Auth } = require('../utils/common')

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

const createUser = async (userData) => {
  try {
    const user = await userRepository.create(userData);
    const role = await roleRepository.getRoleByName('customer');
    await user.addRole(role);
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

const isAuthenticated = async (token) => {
  try {
    if (!token) {
      throw new AppError('Token not found', StatusCodes.BAD_REQUEST);
    }

    const response = Auth.verifyToken(token);
    if (!response) {
      throw new AppError('Invalid token', StatusCodes.UNAUTHORIZED);
    }
    const user = await userRepository.getUserByEmail(response.email);
    if (!user) {
      throw new AppError('No user found for the given token', StatusCodes.NOT_FOUND);
    }
    return user;

  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(error.message, StatusCodes.UNAUTHORIZED);
  }
}

const addRoleToUser = async (data) =>{
  try {
    const user = await userRepository.findOne(data.userId);
    if(!user){
      throw new AppError('User not found', StatusCodes.NOT_FOUND);
    }

    const role = await roleRepository.getRoleByName(data.roleName);
    if(!role){
      throw new AppError('Role not found for the user', StatusCodes.NOT_FOUND);
    }
    await user.addRole(role);

    return user;
  } catch (error) {
    if(error instanceof AppError){
      throw error;
    }
    throw new AppError(error.message || 'Something went wrong while adding role to user', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

const isAdmin = async (id) =>{
  try {
    const user = await userRepository.findOne(id);
    if(!user){
      throw new AppError('User not found', StatusCodes.NOT_FOUND);
    }
    const adminRole = await roleRepository.getRoleByName('admin');
    const response = await user.hasRole(adminRole);
    return response;
  } catch (error) {
    if(error instanceof AppError){
      throw error;
    }
    throw new AppError(error.message || 'Something went wrong while checking admin role', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


module.exports = { createUser, signInUser, isAuthenticated, addRoleToUser, isAdmin };