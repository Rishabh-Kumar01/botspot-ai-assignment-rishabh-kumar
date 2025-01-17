import { TaskRepository } from "../repositories/taskRepository.js";
import { AppError } from "../utils/error.js";

export class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async createTask(taskData) {
    try {
      return await this.taskRepository.create(taskData);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async getAllTasks(userId, { page, limit, search }) {
    try {
      const query = { user: userId };
      if (search) {
        query.$text = { $search: search };
      }
      console.log("Query", query);
      
      const skip = (page - 1) * limit;
      const [tasks, total] = await Promise.all([
        this.taskRepository.findAll(query, skip, limit),
        this.taskRepository.count(query),
      ]);

      return {
        tasks,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        total,
      };
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  async getTaskById(taskId, userId) {
    try {
      const task = await this.taskRepository.findOne({
        _id: taskId,
        user: userId,
      });
      if (!task) {
        throw new AppError("Task not found", 404);
      }
      return task;
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 400);
    }
  }

  async updateTask(taskId, updateData, userId) {
    try {
      const task = await this.taskRepository.update(
        { _id: taskId, user: userId },
        updateData
      );
      if (!task) {
        throw new AppError("Task not found", 404);
      }
      return task;
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 400);
    }
  }

  async deleteTask(taskId, userId) {
    try {
      const task = await this.taskRepository.delete({
        _id: taskId,
        user: userId,
      });
      if (!task) {
        throw new AppError("Task not found", 404);
      }
      return task;
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 400);
    }
  }
}
