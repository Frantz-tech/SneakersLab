import { Router } from "express";
import {
  createPostController,
  deletePostController,
  getPostByIdController,
  getPostController,
  updatePostController,
} from "../controllers/postController.js";

const router = Router();

router.post("/api/post", createPostController);

router.get("/api/post/", getPostController);

router.get("/api/post/:id", getPostByIdController);

router.put("/api/post/:id", updatePostController);

router.delete("/api/post/:id", deletePostController);

export default router;
