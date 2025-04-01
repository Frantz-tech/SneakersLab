import {
  updateBadgeService,
  createBadgeService,
  deleteBadgeService,
  getAllBadgesService,
  getBadgeByIdService,
} from "../services/BadgeService.js";

//  ********************************
// Badge routes: ********************
//  ********************************

// Récuperation de tous les utilisateurs
export const getBadgesController = () => {
  return getAllBadgesService();
};

// Récuperation d'un utilisateur par son id
export const getBadgesByIdController = (id) => {
  return getBadgeByIdService(id);
};

// insertion d'un utilisateur dans la base de données
export const createBadgeController = (Badge) => {
  return createBadgeService(Badge);
};

// Suppresion d'un utilisateur de la base de données
export const deleteBadgeController = (id) => {
  return deleteBadgeService(id);
};

// Modification d'un utilisateur dans la base de données
export const updateBadgeController = (req, id) => {
  return updateBadgeService(id, req);
};
