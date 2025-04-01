import {
  updatedBadgeRepository,
  createBadgeRepository,
  deleteBadgeRepository,
  getAllBadgesRepository,
  getBadgeByIdRepository,
} from "../repository/BadgeRepository.js";

export const getAllBadgesService = () => {
  return getAllBadgesRepository();
};

export const getBadgeByIdService = (id) => {
  return getBadgeByIdRepository(id);
};

export const createBadgeService = (req) => {
  return createBadgeRepository(req);
};

export const deleteBadgeService = (id) => {
  return deleteBadgeRepository(id);
};

export const updateBadgeService = (id, req) => {
  return updatedBadgeRepository(id, req);
};
