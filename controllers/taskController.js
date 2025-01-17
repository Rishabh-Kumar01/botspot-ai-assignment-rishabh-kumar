import { TaskService } from "../services/taskService.js";
import { AppError } from "../utils/error.js";

export class TaskController {
  constructor() {
    this.taskService = new TaskService();
  }

  createTask = async (req, res, next) => {
    try {
      const task = await this.taskService.createTask({
        ...req.body,
        user: req.user._id,
      });
      res.status(201).json({ status: "success", data: task });
    } catch (error) {
      next(error);
    }
  };

  getAllTasks = async (req, res, next) => {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const tasks = await this.taskService.getAllTasks(req.user._id, {
        page: parseInt(page),
        limit: parseInt(limit),
        search,
      });
      res.status(200).json({ status: "success", data: tasks });
    } catch (error) {
      next(error);
    }
  };

  getTaskById = async (req, res, next) => {
    try {
      const task = await this.taskService.getTaskById(
        req.params.id,
        req.user._id
      );
      if (!task) {
        throw new AppError("Task not found", 404);
      }
      res.status(200).json({ status: "success", data: task });
    } catch (error) {
      next(error);
    }
  };

  updateTask = async (req, res, next) => {
    try {
      const task = await this.taskService.updateTask(
        req.params.id,
        req.body,
        req.user._id
      );
      if (!task) {
        throw new AppError("Task not found", 404);
      }
      res.status(200).json({ status: "success", data: task });
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (req, res, next) => {
    try {
      const task = await this.taskService.deleteTask(
        req.params.id,
        req.user._id
      );
      if (!task) {
        throw new AppError("Task not found", 404);
      }
      res.status(200).json({ status: "success", data: null });
    } catch (error) {
      next(error);
    }
  };
}
