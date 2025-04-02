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
// user routes:
// *********************

// Récuperation de tous les utilisateurs
router.get("/api/users", getAllUsersController);

// Récuperation d'un utilisateur par son id
// router.get("/api/users/:id", async (req, res) => {
//   const id = req.params.id;
//   const user = getUserByIdController(id);
//   res.send(user);
// });
router.get("/api/users/:id", getUserByIdController);

// insertion d'un utilisateur dans la base de données
// router.post("/api/users/", async (req, res) => {
//   const createdUser = createUserController(req);
//   res.send(createdUser);
// });
router.post("/api/users/", createUserController);

// Suppresion d'un utilisateur de la base de données
// router.delete("/api/users/:id", async (req, res) => {
//   const id = req.params.id;
//   const deletedUser = deleteUserController(id);
//   res.send(deletedUser);
// });
router.post("/api/users/", deleteUserController);

// Modification d'un utilisateur dans la base de données
// router.put("/api/users/:id", async (req, res) => {
//   const id = req.params.id;
//   const updatedUser = updateUserController(id, req);
//   res.send(updatedUser);
// });
router.post("/api/users/", updateUserController);

export default router;
