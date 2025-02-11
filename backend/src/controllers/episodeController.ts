import { Request, Response } from "express";
import { EpisodeService } from "../services/episodeService";

export class EpisodeController {
  // GET /api/episodes/movie/:movieId - Lấy tất cả tập phim của một phim cụ thể
  static async getEpisodesByMovie(req: Request, res: Response) {
    try {
      const movieId = parseInt(req.params.movieId);
      const episodes = await EpisodeService.getEpisodesByMovieId(movieId);
      res.json(episodes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/episodes - Lấy danh sách tất cả tập phim
  static async getAllEpisodes(req: Request, res: Response) {
    try {
      const episodes = await EpisodeService.getAllEpisodes();
      res.json(episodes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/episodes/:id - Lấy thông tin một tập phim theo id
  static async getEpisode(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const episode = await EpisodeService.getEpisode(id);
      res.json(episode);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  // POST /api/episodes - Tạo mới một tập phim
  static async createEpisode(req: Request, res: Response) {
    try {
      const newEpisode = await EpisodeService.createEpisode(req.body);
      res.status(201).json(newEpisode);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // PUT /api/episodes/:id - Cập nhật một tập phim theo id
  static async updateEpisode(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updatedEpisode = await EpisodeService.updateEpisode(id, req.body);
      res.json(updatedEpisode);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  // DELETE /api/episodes/:id - Xóa một tập phim theo id
  static async deleteEpisode(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const result = await EpisodeService.deleteEpisode(id);
      res.json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}
