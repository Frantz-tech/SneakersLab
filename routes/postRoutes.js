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

router.get("/api/get/post/all", getPostController);

router.get("/api/get/post/:id", getPostByIdController);

router.put("/api/update/post/:id", updatePostController);

router.delete("/api/delete/post/:id", deletePostController);

export default router;
