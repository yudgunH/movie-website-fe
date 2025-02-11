import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import customerRoutes from "./routes/customerRoutes";
import movieRoutes from "./routes/movieRoutes";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/movies", movieRoutes);
export default app;
