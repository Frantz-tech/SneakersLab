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
// Badge routes: CRUD
// *********************

// Récuperation de tous les badges
router.get("/api/badges", getAllBadgesController);

// Récuperation d'un badge par son id
router.get("/api/badges/:id", getBadgeByIdController);

// insertion d'un badge dans la base de données
router.post("/api/badges/", createBadgeController);

// Modification d'un badge dans la base de données
router.put("/api/badges/:id", updateBadgeController);

// Suppresion d'un badge de la base de données
router.delete("/api/badges/:id", deleteBadgeController);

export default router;
