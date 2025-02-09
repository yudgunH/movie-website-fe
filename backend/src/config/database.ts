import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User } from "../models/User"; // Import model User

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: "postgres",
  models: [User], // Thêm model User vào đây
  logging: false,
});

export default sequelize;
