import { Router } from "express";
import {
  updateBadgeController,
  createBadgeController,
  deleteBadgeController,
  getAllBadgesController,
  getBadgeByIdController,
} from "../controllers/badgeController.js";

const router = Router();

// *********************
// badge routes:
// *********************

// Récuperation de tous les utilisateurs
router.get("api/badge", getAllBadgesController());

// Récuperation d'un utilisateur par son id
router.get("api/badge/:id", async (req, res) => {
  const id = req.params.id;
  const user = getBadgeByIdController(id);
  res.send(user);
});

// insertion d'un utilisateur dans la base de données
router.post("api/badge/", async (req, res) => {
  const createdUser = createBadgeController(req);
  res.send(createdUser);
});

// Suppresion d'un utilisateur de la base de données
router.delete("api/badge/:id", async (req, res) => {
  const id = req.params.id;
  const deletedUser = deleteBadgeController(id);
  res.send(deletedUser);
});

// Modification d'un utilisateur dans la base de données
router.put("api/badge/:id", async (req, res) => {
  const id = req.params.id;
  const updatedUser = updateBadgeController(id, req);
  res.send(updatedUser);
});

export default router;
