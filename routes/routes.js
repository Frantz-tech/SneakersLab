import { Router } from "express";
import mediaRoutes from "./mediaRoutes.js";
import postRoutes from "./postRoutes.js";
const router = Router();
router.use(postRoutes);
router.use(mediaRoutes);

export default router;
