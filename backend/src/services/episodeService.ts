import { Episode } from "../models/Episode";

export class EpisodeService {
  /**
   * Lấy thông tin một tập phim theo id
   * @param id - ID của tập phim
   */
  static async getEpisode(id: number) {
    const episode = await Episode.findByPk(id);
    if (!episode) throw new Error("Episode not found");
    return episode;
  }

  /**
   * Lấy danh sách tất cả tập phim
   */
  static async getAllEpisodes() {
    return await Episode.findAll();
  }

  /**
   * Lấy danh sách tập phim theo movieId
   * @param movieId - ID của phim
   */
  static async getEpisodesByMovieId(movieId: number) {
    return await Episode.findAll({ where: { movieId } });
  }

  /**
   * Tạo mới một tập phim
   * @param data - Dữ liệu của tập phim cần tạo
   */
  static async createEpisode(data: {
    movieId: number;
    episodeNumber: number;
    videoUrl: string;
  }) {
    const newEpisode = await Episode.create({
      ...data,
      // Nếu bảng có cấu hình timestamps: true, Sequelize sẽ tự động xử lý createdAt và updatedAt
    });
    return newEpisode;
  }

  /**
   * Cập nhật thông tin tập phim
   * @param id - ID của tập phim cần cập nhật
   * @param data - Dữ liệu cập nhật
   */
  static async updateEpisode(
    id: number,
    data: Partial<{
      movieId: number;
      episodeNumber: number;
      videoUrl: string;
    }>
  ) {
    const episode = await Episode.findByPk(id);
    if (!episode) throw new Error("Episode not found");

    Object.assign(episode, data);
    await episode.save();
    return episode;
  }

  /**
   * Xóa tập phim theo id
   * @param id - ID của tập phim cần xóa
   */
  static async deleteEpisode(id: number) {
    const episode = await Episode.findByPk(id);
    if (!episode) throw new Error("Episode not found");

    await episode.destroy();
    return { message: "Episode deleted successfully" };
  }
}
