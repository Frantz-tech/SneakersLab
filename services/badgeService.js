import {
  updatedBadgeRepository,
  createBadgeRepository,
  deleteBadgeRepository,
  getAllBadgesRepository,
  getBadgeByIdRepository,
} from "../repository/badgeRepository.js";

export const getAllBadgesService = async () => {
  try {
    return await getAllBadgesRepository();
  } catch (error) {
    throw "Error lors de la récuperation des badges: " + error;
  }
};

export const getBadgeByIdService = async (id) => {
  try {
    return await getBadgeByIdRepository(id);
  } catch (error) {
    throw "Error lors de la récuperation de l'utilisateur: " + error;
  }
};

export const createBadgeService = async (Badge) => {
  try {
    const createdBadge = await createBadgeRepository(Badge);
    return createdBadge;
  } catch (error) {
    throw "Error lors de la création du badge: " + error;
  }
};

export const updateBadgeService = (id, badge) => {
  try {
    return updatedBadgeRepository(id, badge);
  } catch (error) {
    throw "Error lors de l'actualisation du badge: " + error;
  }
};

export const deleteBadgeService = async (id) => {
  try {
    return await deleteBadgeRepository(id);
  } catch (error) {
    throw "Error lors de la supression du badge: " + error;
  }
};
