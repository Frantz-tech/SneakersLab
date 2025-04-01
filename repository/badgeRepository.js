import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//  ********************************
//  BadgeS REPOSITORY
//  ********************************

export const getAllBadgesRepository = () => {
  try {
    const badges = prisma.badge.findMany();
    return { success: 1, data: badges };
  } catch {
    return { success: 0, error: "Impossible de récuperer les badges" };
  }
};

export const getBadgeByIdRepository = (id) => {
  try {
    const badge = prisma.badge.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    return { success: 1, data: badge };
  } catch {
    return { success: 0, error: "Impossible de récuperer le badge" };
  }
};

export const createBadgeRepository = (badge) => {
  try {
    const createdBadge = prisma.badge.create({
      data: badge,
    });
    return { success: 1, data: createdBadge };
  } catch {
    return { success: 0, error: "Impossible de créer l'utilisateur" };
  }
};

export const deleteBadgeRepository = (id) => {
  try {
    const deletedBadge = prisma.badge.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { success: 1, data: deletedBadge };
  } catch {
    return { success: 0, error: "Impossible de supprimer l'utilisateur" };
  }
};

export const updatedBadgeRepository = (id, req) => {
  try {
    const updatedBadge = prisma.badge.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    return { success: 1, data: updatedBadge };
  } catch {
    return { success: 0, error: "Impossible d'actualiser l'utilisateur" };
  }
};
