import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//  ********************************
//  BADGES REPOSITORY
//  ********************************

export const getAllBadgesRepository = async () => {
  try {
    const badges = await prisma.badge.findMany();
    return { success: 1, data: badges };
  } catch {
    return { success: 0, message: "Impossible de récuperer les badges" };
  }
};

export const getBadgeByIdRepository = async (id) => {
  try {
    const badge = await prisma.badge.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    if (!badge) return { success: 1, data: [] };
    else return { success: 1, data: badge };
  } catch {
    return { success: 0, data: "Impossible de récuperer le badge" };
  }
};

export const createBadgeRepository = async (badge) => {
  try {
    const createdBadge = await prisma.badge.create({
      data: badge,
    });
    return { success: 1, data: createdBadge };
  } catch (error) {
    return {
      success: 0,
      data: "Impossible de créer le badge",
      error: error.message,
    };
  }
};

export const deleteBadgeRepository = async (id) => {
  try {
    const deletedBadge = await prisma.badge.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { success: 1, data: deletedBadge };
  } catch {
    return { success: 0, data: "Impossible de supprimer le badge" };
  }
};

export const updatedBadgeRepository = async (id, badge) => {
  try {
    const updatedBadge = await prisma.badge.update({
      where: { id: parseInt(id) },
      data: badge,
    });
    return { success: 1, data: updatedBadge };
  } catch {
    return { success: 0, data: "Impossible d'actualiser le badge" };
  }
};

export const existeNiveauBadgeRepository = async (niveau) => {
  try {
    const existeNiveauBadge = await prisma.badge.findFirst({
      where: {
        niveau: niveau,
      },
    });
    return {
      existe: !(existeNiveauBadge === null),
      index: existeNiveauBadge ? existeNiveauBadge.id : 1,
    };
  } catch (error) {
    throw "Error (existeNiveauBadgeRepository): " + error;
  }
};
