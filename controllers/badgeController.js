import {
  updateBadgeService,
  createBadgeService,
  deleteBadgeService,
  getAllBadgesService,
  getBadgeByIdService,
} from "../services/badgeService.js";

//  ********************************
// Badge routes: ********************
//  ********************************

// Récuperation de tous les Badges
export const getAllBadgesController = async (_, res) => {
  try {
    const badges = await getAllBadgesService();
    res.status(200).json(badges);
  } catch (error) {
    res
      .status(500)
      .json(
        `message: 'Erreur lors de la récupération des badges (BadgeController) :', ${error}`,
      );
  }
};

// Récuperation d'un badge par son id
export const getBadgeByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const badge = await getBadgeByIdService(id);
    res.status(200).json(badge);
  } catch (error) {
    res
      .status(500)
      .json(
        `message: 'Erreur lors de la récupération du badge (BadgeController) :', ${error}`,
      );
  }
};

// Création d'un badge par son id
export const createBadgeController = async (req, res) => {
  try {
    const badge = await createBadgeService(req.body);
    res.status(200).json(badge);
  } catch (error) {
    res
      .status(500)
      .json(
        `message: 'Erreur lors de la création du badge (BadgeController) :', ${error}`,
      );
  }
};

export const updateBadgeController = async (req, res) => {
  try {
    const id = req.params.id;
    const badge = await updateBadgeService(id, req.body);
    res.status(200).json(badge);
  } catch (error) {
    res
      .status(500)
      .json(
        `message: 'Erreur lors de l'élimination du badge (BadgeController) :', ${error}`,
      );
  }
};

export const deleteBadgeController = async (req, res) => {
  try {
    const id = req.params.id;
    const badge = await deleteBadgeService(id);
    res.status(200).json(badge);
  } catch (error) {
    res
      .status(500)
      .json(
        `message: 'Erreur lors du badge de l'utilisateur (BadgeController) :', ${error}`,
      );
  }
};
