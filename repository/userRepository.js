import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//  ********************************
//  USERS REPOSITORY
//  ********************************

export const getAllUsersRepository = async () => {
  try {
    const users = await prisma.user.findMany();
    return { success: 1, data: users };
  } catch {
    return { success: 0, message: "Impossible de récuperer les utilisateurs" };
  }
};

export const getUserByIdRepository = async (id) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) return { success: 1, data: [] };
    else return { success: 1, data: user };
  } catch {
    return { success: 0, data: "Impossible de récuperer l'utilisateur" };
  }
};

export const createUserRepository = async (user) => {
  try {
    const createdUser = await prisma.user.create({
      data: user,
    });
    return { success: 1, data: createdUser };
  } catch (error) {
    return {
      success: 0,
      data: "Impossible de créer l'utilisateur",
      error: error.message,
    };
  }
};

export const deleteUserRepository = async (id) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { success: 1, data: deletedUser };
  } catch {
    return { success: 0, data: "Impossible de supprimer l'utilisateur" };
  }
};

export const updatedUserRepository = async (id, user) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: user,
    });
    return { success: 1, data: updatedUser };
  } catch {
    return { success: 0, data: "Impossible d'actualiser l'utilisateur" };
  }
};
