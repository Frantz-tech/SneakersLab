import {
  updateUserService,
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
} from "../services/userService.js";

//  ********************************
// user routes: ********************
//  ********************************

// Récuperation de tous les utilisateurs
export const getUsersController = () => {
  return getAllUsersService();
};

// Récuperation d'un utilisateur par son id
export const getUsersByIdController = (id) => {
  return getUserByIdService(id);
};

// insertion d'un utilisateur dans la base de données
export const createUserController = (user) => {
  return createUserService(user);
};

// Suppresion d'un utilisateur de la base de données
export const deleteUserController = (id) => {
  return deleteUserService(id);
};

// Modification d'un utilisateur dans la base de données
export const updateUserController = (req, id) => {
  return updateUserService(id, req);
};
