import Task from "../models/Task.js";
import { AppError } from "../utils/error.js";

export class TaskRepository {
  async create(data) {
    try {
      return await Task.create(data);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async findAll(query, skip, limit) {
    try {
      return await Task.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async findOne(query) {
    try {
      return await Task.findOne(query);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async update(query, data) {
    try {
      return await Task.findOneAndUpdate(query, data, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async delete(query) {
    try {
      return await Task.findOneAndDelete(query);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async count(query) {
    try {
      return await Task.countDocuments(query);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }
}
