import {
  updatedUserRepository,
  createUserRepository,
  deleteUserRepository,
  getAllUsersRepository,
  getUserByIdRepository,
  getUserByEmailRepository,
} from "../repository/userRepository.js";
import { existeNiveauBadgeRepository, createBadgeRepository } from "../repository/badgeRepository.js";

export const getAllUsersService = async () => {
  try {
    return await getAllUsersRepository();
  } catch (error) {
    throw "Error lors de la récuperation des utilisateurs: " + error;
  }
};

export const getUserByIdService = async (id) => {
  try {
    return await getUserByIdRepository(id);
  } catch (error) {
    throw "Error lors de la récuperation de l'utilisateur: " + error;
  }
};

export const createUserService = async (user) => {
  try {
    const existe = (await getUserByEmailRepository(user.email)).success;
    if (!existe) {
      const niveauInitial = 1; //niveau de depart d'un nouveau utilisateur qui commence du plus bas...
      const existeBadgeInitial = await existeNiveauBadgeRepository(niveauInitial);
      if (!existeBadgeInitial.existe) {
        const badgeInitial = {
          name: "Influenceur",
          niveau: 1,
          icon: "",
        };
        await createBadgeRepository(badgeInitial);
      }
      user.badgeId = parseInt(existeBadgeInitial.index);
      const createdUser = await createUserRepository(user);
      return createdUser;
    }
    return { error: "Utilisateur existe déjà dans la BBDD" };
  } catch (error) {
    throw "Error lors de la création de l'utilisateur: " + error;
  }
};

export const updateUserService = (id, user) => {
  try {
    return updatedUserRepository(id, user);
  } catch (error) {
    throw "Error lors de l'actualisation de l'utilisateur: " + error;
  }
};

export const deleteUserService = async (id) => {
  try {
    return await deleteUserRepository(id);
  } catch (error) {
    throw "Error lors de la supression de l'utilisateur: " + error;
  }
};
