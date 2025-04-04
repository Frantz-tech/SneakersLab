// routes/groupeRoutes.js
import express from 'express';
import { getAll, getById, create, update, deleteGroupe } from '../controllers/groupe_Controllers.js'; // Importation des fonctions du contrôleur

const router = express.Router();

router.get("/api/get/groupe", getAll);   // Affiche tous les groupes
router.get("/api/get/groupe/:id", getById);  // Affiche un groupe par ID
router.post("/api/post/groupe", create);     // Crée un nouveau groupe
router.put("/api/update/groupe/:id", update); // Met à jour un groupe
router.delete("/api/delete/groupe/:id", deleteGroupe); // Supprime un groupe

export default router;  // Exportation de la route
