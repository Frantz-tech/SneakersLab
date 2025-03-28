import { Router } from "express";
import { createPostController, getPostByIdController, getPostController } from "../controllers/postController.js";

const router = Router();

router.post("/api/post", createPostController);

router.get("/api/post", getPostController);

router.get("/api/post/:id", getPostByIdController);
export default router;
