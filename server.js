import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { AppError } from "./utils/error.js";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB Connected Successfully");

    const app = express();

    // Global Middleware
    app.use(morgan("dev"));
    app.use(express.json());

    // Routes
    app.use("/api/tasks", taskRoutes);
    app.use("/api/auth", authRoutes);

    // Handle undefined routes
    app.all("*", (req, res, next) => {
      next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });

    // Error handling middleware
    app.use(errorHandler);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
