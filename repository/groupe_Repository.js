import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ Récupérer tous les groupes
export const getAllGroupes = async () => {
  const groupes = await prisma.group.findMany({
    include: { membres: true }, // Inclure les membres pour vérifier si un membre existe
  });
  console.log("getAllGroupes || groupes",groupes); // Affiche les groupes dans la console
  return groupes
};

// ✅ Récupérer un groupz par ID avec ses membres
export const getGroupeById = async (id) => {
  return await prisma.Group.findUnique({
    where: { id: Number(id) },
    include: { membres: true }, // Inclure les membres pour vérifier si un membre existe
  });
};

// ✅ Créer un groupz
export const createGroupe = async (data) => {
  return await prisma.Group.create({
    data: {
      nom: data.nom,
      description: data.description,
      adminId: data.adminId,
      type: data.type,
      maxMembres: data.maxMembres,
      nbMembres: data.nbMembres,
      membres: {
        create: { membreId: data.adminId }, // Ajoute l'admin comme premier membre
      },
    },
  });
};

// ✅ Mettre à jour un groupz
export const updateGroupe = async (id, data) => {
  return await prisma.Group.update({
    where: { id: Number(id) },
    data,
  });
};

// ✅ Supprimer un groupz et ses membres en transaction
export const deleteGroupeWithMembers = async (id) => {
  return await prisma.$transaction([
    prisma.usersGroup.deleteMany({ where: { groupId: Number(id) } }), // Supprime tous les membres du groupz
    prisma.Group.delete({ where: { id: Number(id) } }), // Supprime le groupz
  ]);
};

// ✅ Ajouter un membre à un groupz
export const addMemberToGroupe = async (groupId, membreId) => {
  return await prisma.usersGroup.create({
    data: { membreId, groupId },
  });
};

// ✅ Retirer un membre d’un groupz
export const removeMemberFromGroupe = async (groupId, membreId) => {
  return await prisma.usersGroup.deleteMany({
    where: { groupId: Number(groupId), membreId: Number(membreId) },
  });
};

// ✅ Vérifier si un membre appartient à un groupz
export const isMemberInGroupe = async (groupId, membreId) => {
  const membre = await prisma.usersGroup.findFirst({
    where: { groupId: Number(groupId), membreId: Number(membreId) },
  });
  return !!membre; // Retourne `true` si le membre existe, sinon `false`
};
