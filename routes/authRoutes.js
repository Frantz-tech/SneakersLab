import express from "express";
import { login, register } from "../controllers/authController.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

export const router = express.Router();

// Route protégée
// router.get("/protected", authMiddleware, (res) => {
//   res.status(200).json({ message: "Access granted to protected route" });
// });
// Route d'inscription
router.post("/register", register);

// Route de connexion
router.post("/login", login);
