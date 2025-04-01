import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

// *********************
// user routes:
// *********************

// Récuperation de tous les utilisateurs
router.get("api/users", userController.getUsers());

// Récuperation d'un utilisateur par son id
router.get("api/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userController.getUsersById(id);
  res.send(user);
});

// insertion d'un utilisateur dans la base de données
router.post("api/users/", async (req, res) => {
  const createdUser = await userController.createUser(req);
  res.send(createdUser);
});

// Suppresion d'un utilisateur de la base de données
router.delete("api/users/:id", async (req, res) => {
  const id = req.params.id;
  const deletedUser = await userController.deleteUser(id);
  res.send(deletedUser);
});

// Modification d'un utilisateur dans la base de données
router.put("api/users/:id", async (req, res) => {
  const id = req.params.id;
  const updatedUser = await userController.updateUser(id, req);
  res.send(updatedUser);
});

export default router;
