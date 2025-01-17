import User from "../models/User.js";
import { AppError } from "../utils/error.js";

export class UserRepository {
  async create(data) {
    try {
      return await User.create(data);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async findOne(query) {
    try {
      return await User.findOne(query);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }
}
