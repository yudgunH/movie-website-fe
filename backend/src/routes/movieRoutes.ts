import { Router } from "express";
import { MovieController } from "../controllers/movieController";

const router = Router();

router.get("/", MovieController.getAllMovies);
router.get("/:id", MovieController.getMovie);
router.post("/", MovieController.createMovie);
router.put("/:id", MovieController.updateMovie);
router.delete("/:id", MovieController.deleteMovie);

export default router;
