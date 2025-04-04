import * as groupe_Repository from '../repository/groupe_Repository.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Créer un groupe avec des règles métier
export const createGroupe = async ({ adminId, nom, description, type }) => {
  if (!['Public', 'Prive'].includes(type)) {
    throw new Error("Type de groupe invalide. Choisissez 'Public' ou 'Prive'.");
  }

  return groupe_Repository.createGroupe({
    nom,
    description,
    adminId,
    type,
    maxMembres: type === 'Public' ? 200 : 15,
    nbMembres: 1,
  });
};

// Récupérer tous les groupes
export const getAllGroupes = async () => {
  return groupe_Repository.getAllGroupes();
};

// Récupérer un groupe par ID avec ses membres
export const getGroupeById = async (id) => {
  return groupe_Repository.getGroupeById(id);
};

// Mettre à jour un groupe (seul l'admin peut le faire)
export const updateGroupe = async ({ groupId, adminId, nom, description }) => {
  const groupe = await groupe_Repository.getGroupeById(groupId);
  if (!groupe) throw new Error("Groupe introuvable");
  if (groupe.adminId !== adminId) throw new Error("Seul l'admin peut modifier le groupe");

  return groupe_Repository.updateGroupe(groupId, { nom, description });
};

// Supprimer un groupe et ses membres (seul l'admin peut le faire)
export const removeGroupeWithMembers = async ({ groupId, adminId }) => {
  const groupe = await groupe_Repository.getGroupeById(groupId);
  if (!groupe) throw new Error("Groupe introuvable");
  if (groupe.adminId !== adminId) throw new Error("Seul l'admin peut supprimer le groupe");

  return groupe_Repository.deleteGroupeWithMembers(groupId);
};

// Ajouter un membre à un groupe
export const addMemberToGroupe = async ({ groupId, membreId, inviterId }) => {
  const groupe = await groupe_Repository.getGroupeById(groupId);
  if (!groupe) throw new Error("Groupe introuvable");

  const isInviterAdmin = groupe.adminId === inviterId;
  const isPublicGroup = groupe.type === 'Public';

  if (!isPublicGroup && !isInviterAdmin) {
    throw new Error("Seul l'admin peut inviter dans un groupe privé");
  }

  if (groupe.nbMembres >= groupe.maxMembres) {
    throw new Error("Le groupe a atteint sa capacité maximale");
  }

  return prisma.usersGroup.create({
    data: { membreId, groupId },
  });
};

// Retirer un membre (seul l'admin peut supprimer)
export const removeMemberFromGroupe = async ({ groupId, membreId, adminId }) => {
  const groupe = await groupe_Repository.getGroupeById(groupId);
  if (!groupe) throw new Error("Groupe introuvable");

  if (groupe.adminId !== adminId) {
    throw new Error("Seul l'admin peut supprimer un membre");
  }

  return prisma.usersGroup.deleteMany({ where: { membreId, groupId } });
};

// Quitter un groupe (tous les membres peuvent partir)
export const leaveGroupe = async ({ groupId, membreId }) => {
  return prisma.usersGroup.deleteMany({ where: { membreId, groupId } });
};

// Promouvoir un membre admin (seul l’admin actuel peut le faire)
export const promoteToAdmin = async ({ groupId, membreId, adminId }) => {
  const groupe = await groupe_Repository.getGroupeById(groupId);
  if (!groupe) throw new Error("Groupe introuvable");
  if (groupe.adminId !== adminId) {
    throw new Error("Seul l'admin actuel peut promouvoir un autre membre");
  }

  const membreExiste = groupe.membres.some(membre => membre.membreId === membreId);
  if (!membreExiste) throw new Error("Le membre à promouvoir n'est pas dans le groupe");

  return groupe_Repository.updateGroupe(groupId, { adminId: membreId });
};
