import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import customerRoutes from "./routes/customerRoutes";
import movieRoutes from "./routes/movieRoutes";
import episodeRoutes from "./routes/episodeRoutes";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/episodes", episodeRoutes);
export default app;
