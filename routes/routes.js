import { Router } from "express";
import postRoutes from "./postRoutes.js";
import userRoutes from "./userRoutes.js";
import badgeRoutes from "./badgeRoutes.js";

const router = Router();

router.use(postRoutes);
router.use(userRoutes);
router.use(badgeRoutes);

export default router;
