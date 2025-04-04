import { 
  getGroupeById, 
  getAllGroupes, 
  createGroupe, 
  updateGroupe 
} from '../repository/groupe_Repository.js';  

import { removeGroupeWithMembers } from '../services/groupe_Service.js'; // Gestion propre de la suppression du groupe et de ses membres

// 📌 Récupérer tous les groupes
export const getAll = async (req, res) => {
  try {
    const groupes = await getAllGroupes(); // Cette fonction doit récupérer tous les groupes
    res.json(groupes);
  } catch (error) {
    res.status(500).json({ error: error.message });
    
    
  }
};

// 📌 Récupérer un groupe par ID
export const getById = async (req, res) => {
  const { id } = req.params;
  const parsedId = parseInt(id, 10);

  // Vérifier si l'ID est valide
  if (isNaN(parsedId)) {
    return res.status(400).json({ message: "L'ID du groupe est invalide" });
  }

  try {
    const groupe = await getGroupeById(parsedId);
    if (!groupe) {
      return res.status(404).json({ message: "Groupe non trouvé" });
    }
    res.json(groupe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Créer un groupe (avec admin et type)
export const create = async (req, res) => {
  const { adminId, name, type } = req.body;

  // Vérification des données d'entrée
  if (!adminId || !name || !type) {
    return res.status(400).json({ message: "Admin ID, nom et type sont requis" });
  }

  try {
    const groupe = await createGroupe({ adminId, name, type });
    res.status(201).json(groupe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Mettre à jour un groupe
export const update = async (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;
  const parsedId = parseInt(id, 10);

  // Vérifier si l'ID est valide
  if (isNaN(parsedId)) {
    return res.status(400).json({ message: "L'ID du groupe est invalide" });
  }

  try {
    const groupe = await updateGroupe(parsedId, { name, type });
    if (!groupe) {
      return res.status(404).json({ message: "Groupe non trouvé" });
    }
    res.json(groupe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Supprimer un groupe (avec gestion des membres)
export const deleteGroupe = async (req, res) => {
  const { id } = req.params;
  const { adminId } = req.body;
  const parsedId = parseInt(id, 10);

  // Vérifier si l'ID du groupe est valide
  if (isNaN(parsedId)) {
    return res.status(400).json({ message: "L'ID du groupe est invalide" });
  }

  // Vérification que l'adminId est bien fourni
  if (!adminId) {
    return res.status(400).json({ message: "L'admin ID est requis pour supprimer un groupe" });
  }

  try {
    // Vérifier si l'adminId appartient au groupe avant de supprimer
    const groupe = await getGroupeById(parsedId);
    if (!groupe || groupe.adminId !== adminId) {
      return res.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer ce groupe" });
    }

    // Supprimer le groupe et ses membres
    await removeGroupeWithMembers({ groupId: parsedId, adminId: parseInt(adminId) });
    res.json({ message: "Groupe et tous ses membres supprimés avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
