<<<<<<< HEAD
import userRoutes from "./userRoutes.js";
import badgeRoutes from "./badgeRoutes.js";

// differents routes de l'app
export const routes = (app) => {
  // routes de l'utilisateur
  app.use(userRoutes);
  app.use(badgeRoutes);
};
=======
import { Router } from "express";
import mediaRoutes from "./mediaRoutes.js";
import postRoutes from "./postRoutes.js";
const router = Router();
router.use(postRoutes);
router.use(mediaRoutes);

export default router;
>>>>>>> dea8eee (chore(post and media): add repo/services/models/schema/controllers/routes for post and media)
