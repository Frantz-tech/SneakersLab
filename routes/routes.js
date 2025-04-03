import { Router } from "express";
import postRoutes from "./postRoutes.js";
import userRoutes from "./userRoutes.js";

const router = Router();

router.use(postRoutes);
router.use(userRoutes);

export default router;
