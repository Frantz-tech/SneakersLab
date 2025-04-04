import {
  updatedUserRepository,
  createUserRepository,
  deleteUserRepository,
  getAllUsersRepository,
  getUserByIdRepository,
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
    console.log("creating user...");

    const niveauInitial = 1; //niveau de depart d'un nouveau utilisateur qui commence du plus bas...
    const existeBadgeInitial = await existeNiveauBadgeRepository(niveauInitial);
    console.log("existe le badge initial? " + existeBadgeInitial);

    if (!existeBadgeInitial.existe) {
      console.log("Creating initial badge...");

      const badgeInitial = {
        name: "Influenceur",
        niveau: 1,
        icon: "",
      };
      const initBadge = await createBadgeRepository(badgeInitial);
      console.log("badge: " + JSON.stringify(initBadge));
    }
    user.badgeId = parseInt(existeBadgeInitial.index);

    console.log("user: " + JSON.stringify(user));

    const createdUser = await createUserRepository(user);
    return createdUser;
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
