import {
  updatedUserRepository,
  createUserRepository,
  deleteUserRepository,
  getAllUsersRepository,
  getUserByIdRepository,
} from "../repository/userRepository.js";

export const getAllUsersService = () => {
  return getAllUsersRepository();
};

export const getUserByIdService = (id) => {
  return getUserByIdRepository(id);
};

export const createUserService = (req) => {
  return createUserRepository(req);
};

export const deleteUserService = (id) => {
  return deleteUserRepository(id);
};

export const updateUserService = (id, req) => {
  return updatedUserRepository(id, req);
};
