import { Request, Response } from "express";
import { UserWatchHistoryService } from "../services/userWatchHistoryService";

export class UserWatchHistoryController {
  /**
   * GET /api/user-watch-histories
   * Lấy danh sách lịch sử xem của chính user (lấy từ token)
   */
  static async getMyWatchHistories(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const histories = await UserWatchHistoryService.getWatchHistoriesByUser(userId);
      res.json(histories);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * GET /api/user-watch-histories/user/:userId
   * Lấy danh sách lịch sử xem của một user cụ thể (chỉ admin được phép)
   */
  static async getWatchHistoriesByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      const histories = await UserWatchHistoryService.getWatchHistoriesByUser(userId);
      res.json(histories);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * POST /api/user-watch-histories
   * Tạo mới một bản ghi lịch sử xem.
   * Lấy userId từ token và movieId từ body.
   *
   * Body JSON mẫu:
   * {
   *    "movieId": 12,
   *    "watchedAt": "2025-02-11T12:34:56.789Z" // (tuỳ chọn, nếu không có sẽ tự động lấy thời gian hiện tại)
   * }
   */
  static async createWatchHistory(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const { movieId, watchedAt } = req.body;
      if (!movieId) {
        res.status(400).json({ error: "movieId is required" });
        return;
      }
      const record = await UserWatchHistoryService.createWatchHistory({ userId, movieId, watchedAt });
      res.status(201).json(record);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * DELETE /api/user-watch-histories/:id
   * Xóa một bản ghi lịch sử xem theo id.
   */
  static async deleteWatchHistory(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await UserWatchHistoryService.deleteWatchHistory(id);
      res.json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}
