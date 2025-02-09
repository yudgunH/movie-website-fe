import sequelize from "../config/database";

(async () => {
  try {
    await sequelize.sync({ force: true }); // Đồng bộ database (xóa bảng cũ và tạo lại)
    console.log("Database synced successfully.");
    process.exit(0); // Thoát chương trình sau khi chạy xong
  } catch (error) {
    console.error("Failed to sync database:", error);
    process.exit(1); // Thoát chương trình với mã lỗi
  }
})();
