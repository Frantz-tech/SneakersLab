import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//  ********************************
//  USERS REPOSITORY
//  ********************************

export const getAllUsersRepository = () => {
  try {
    const users = prisma.user.findMany();
    return { success: 1, data: users };
  } catch {
    return { success: 0, error: "Impossible de récuperer les utilisateurs" };
  }
};

export const getUserByIdRepository = (id) => {
  try {
    const user = prisma.user.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    return { success: 1, data: user };
  } catch {
    return { success: 0, error: "Impossible de récuperer l'utilisateur" };
  }
};

export const createUserRepository = (user) => {
  try {
    const createdUser = prisma.user.create({
      data: user,
    });
    return { success: 1, data: createdUser };
  } catch {
    return { success: 0, error: "Impossible de créer l'utilisateur" };
  }
};

export const deleteUserRepository = (id) => {
  try {
    const deletedUser = prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { success: 1, data: deletedUser };
  } catch {
    return { success: 0, error: "Impossible de supprimer l'utilisateur" };
  }
};

export const updatedUserRepository = (id, req) => {
  try {
    const updatedUser = prisma.user.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    return { success: 1, data: updatedUser };
  } catch {
    return { success: 0, error: "Impossible d'actualiser l'utilisateur" };
  }
};
