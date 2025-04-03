import { Router } from "express";
import mediaRoutes from "./mediaRoutes.js";
import postRoutes from "./postRoutes.js";
import userRoutes from "./userRoutes.js";
const router = Router();
router.use(postRoutes);
router.use(mediaRoutes);
router.use(userRoutes);
export default router;
