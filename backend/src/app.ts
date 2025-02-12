import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import customerRoutes from "./routes/customerRoutes";
import movieRoutes from "./routes/movieRoutes";
import episodeRoutes from "./routes/episodeRoutes";
import userFavoriteRoutes from "./routes/userFavoriteRoutes";
import userWatchHistoryRoutes from "./routes/userWatchHistoryRoutes";
import movieCommentRoutes from "./routes/movieCommentRoutes";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/episodes", episodeRoutes);
app.use("/api/user-favorites", userFavoriteRoutes);
app.use("/api/user-watch-histories", userWatchHistoryRoutes);
app.use("/api/movie-comments", movieCommentRoutes);
export default app;
