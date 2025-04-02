import {
  updatedUserRepository,
  createUserRepository,
  deleteUserRepository,
  getAllUsersRepository,
  getUserByIdRepository,
} from "../repository/userRepository.js";

export const getAllUsersService = async () => {
  try {
    return await getAllUsersRepository();
  } catch (error) {
    return {
      success: 0,
      error: "Impossible de récuperer les utilisateurs (userService) :" + error,
    };
  }
};

export const getUserByIdService = async (id) => {
  try {
    return await getUserByIdRepository(id);
  } catch (error) {
    return {
      success: 0,
      error: "Impossible de récuperer l'utilisateur (userService) :" + error,
    };
  }
};

export const createUserService = async (user) => {
  try {
    return await createUserRepository(user);
  } catch (error) {
    return {
      success: 0,
      error:
        "Erreur lors de la création de l'utilisateur (userService) :" + error,
    };
  }
};

export const deleteUserService = async (id) => {
  try {
    return await deleteUserRepository(id);
  } catch (error) {
    return {
      success: 0,
      error:
        "Erreur lors de la suppresion de l'utilisateur (userService) :" + error,
    };
  }
};

export const updateUserService = (id, user) => {
  try {
    return updatedUserRepository(id, user);
  } catch (error) {
    return {
      success: 0,
      error:
        "Erreur lors de l'actualisation de l'utilisateur (userService) :" +
        error,
    };
  }
};
