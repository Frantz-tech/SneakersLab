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
export const getAllUsersController = async (_, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(`message: 'Erreur lors de la récupération des utilisateurs (userController) :', ${error}`);
  }
};

// Récuperation d'un utilisateur par son id
export const getUserByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserByIdService(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(`message: 'Erreur lors de la récupération de l'utilisateur (userController) :', ${error}`);
  }
};

// Création d'un utilisateur
export const createUserController = async (req, res) => {
  try {
    const user = await createUserService(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(`message: 'Erreur lors de la création de l'utilisateur  (userController) :', ${error}`);
  }
};

// Actualisation d'un utilisateur
export const updateUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await updateUserService(id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(`message: 'Erreur lors de l'élimination de l'utilisateur (userController) :', ${error}`);
  }
};

// Supresszion d'un utilisateur
export const deleteUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await deleteUserService(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(`message: 'Erreur lors de l'élimination de l'utilisateur (userController) :', ${error}`);
  }
};
