import jwt from "jsonwebtoken";
import { AppError } from "../utils/error.js";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new AppError("Not authorized", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new AppError("User not found", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      next(new AppError("Invalid token", 401));
    } else if (error.name === "TokenExpiredError") {
      next(new AppError("Token expired", 401));
    } else {
      next(error);
    }
  }
};
