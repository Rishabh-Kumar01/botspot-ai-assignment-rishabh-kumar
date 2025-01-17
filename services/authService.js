import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository.js";
import { AppError } from "../utils/error.js";

export class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  generateToken(userId) {
    try {
      return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
    } catch (error) {
      throw new AppError("Error generating token", 500);
    }
  }

  async register(userData) {
    try {
      const existingUser = await this.userRepository.findOne({
        $or: [{ email: userData.email }, { username: userData.username }],
      });

      if (existingUser) {
        throw new AppError("User already exists", 400);
      }

      const user = await this.userRepository.create(userData);
      const token = this.generateToken(user._id);

      return { user, token };
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 400);
    }
  }

  async login({ email, password }) {
    try {
      const user = await this.userRepository.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        throw new AppError("Invalid credentials", 401);
      }

      const token = this.generateToken(user._id);
      return { user, token };
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 400);
    }
  }
}
