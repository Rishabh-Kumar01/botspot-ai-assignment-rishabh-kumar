import express from "express";
import { TaskController } from "../controllers/taskController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
const taskController = new TaskController();

router.use(protect);

router
  .route("/")
  .post(taskController.createTask)
  .get(taskController.getAllTasks);

router
  .route("/:id")
  .get(taskController.getTaskById)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

export default router;
