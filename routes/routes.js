import { Router } from "express";
import postRoutes from "./postRoutes.js";
const router = Router();
router.use(postRoutes);

export default router;
