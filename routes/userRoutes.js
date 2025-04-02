import { Router } from "express";
import {
  updateUserController,
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
} from "../controllers/userController.js";

const router = Router();

// *********************
// user routes: CRUD
// *********************

// Récuperation de tous les utilisateurs
router.get("/api/users", getAllUsersController);

// Récuperation d'un utilisateur par son id
router.get("/api/users/:id", getUserByIdController);

// insertion d'un utilisateur dans la base de données
router.post("/api/users/", createUserController);

// Modification d'un utilisateur dans la base de données
router.put("/api/users/:id", updateUserController);

// Suppresion d'un utilisateur de la base de données
router.delete("/api/users/:id", deleteUserController);

export default router;
