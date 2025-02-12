import { UserWatchHistory } from "../models/UserWatchHistory";

export class UserWatchHistoryService {
  /**
   * Lấy thông tin 1 bản ghi lịch sử xem theo id
   * @param id - ID của bản ghi lịch sử xem
   */
  static async getWatchHistoryById(id: number) {
    const history = await UserWatchHistory.findByPk(id);
    if (!history) throw new Error("UserWatchHistory not found");
    return history;
  }

  /**
   * Lấy danh sách lịch sử xem của một user
   * @param userId - ID của user
   */
  static async getWatchHistoriesByUser(userId: number) {
    return await UserWatchHistory.findAll({
      where: { userId },
      order: [["watchedAt", "DESC"]]
    });
  }

  /**
   * Tạo mới một bản ghi lịch sử xem.
   * @param data - Dữ liệu gồm userId, movieId và (tuỳ chọn) watchedAt.
   */
  static async createWatchHistory(data: { userId: number; movieId: number; watchedAt?: Date }) {
    const newRecord = await UserWatchHistory.create({
      ...data,
      watchedAt: data.watchedAt || new Date()
    });
    return newRecord;
  }

  /**
   * Xóa một bản ghi lịch sử xem theo id
   * @param id - ID của bản ghi lịch sử xem cần xóa
   */
  static async deleteWatchHistory(id: number) {
    const record = await UserWatchHistory.findByPk(id);
    if (!record) throw new Error("UserWatchHistory not found");
    await record.destroy();
    return { message: "UserWatchHistory deleted successfully" };
  }
}
