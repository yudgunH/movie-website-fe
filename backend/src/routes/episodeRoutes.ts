import { Router } from "express";
import { EpisodeController } from "../controllers/episodeController";

const router = Router();

// Route để lấy các tập phim theo movieId
router.get("/movie/:movieId", EpisodeController.getEpisodesByMovie);

// Route để lấy danh sách tất cả tập phim
router.get("/", EpisodeController.getAllEpisodes);

// Route để lấy thông tin tập phim theo id
router.get("/:id", EpisodeController.getEpisode);

// Tạo mới một tập phim
router.post("/", EpisodeController.createEpisode);

// Cập nhật tập phim theo id
router.put("/:id", EpisodeController.updateEpisode);

// Xóa tập phim theo id
router.delete("/:id", EpisodeController.deleteEpisode);

export default router;
