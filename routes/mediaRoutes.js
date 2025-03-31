import { Router } from "express";
import {
  createMediaController,
  deleteMediaController,
  getAllMediaController,
  getMediaByIdController,
  getMediaByPostController,
  updateMediaController,
} from "../controllers/mediaController.js";

const router = Router();

router.post("/api/media", createMediaController);

router.get("/api/get/media/all", getAllMediaController);

router.get("/api/get/media/:id", getMediaByIdController);

router.put("/api/update/media/:id", updateMediaController);

router.delete("/api/delete/media/:id", deleteMediaController);

router.get("/api/media/post/:id", getMediaByPostController);

export default router;
