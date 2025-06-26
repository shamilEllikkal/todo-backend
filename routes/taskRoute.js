import express from "express";
import {
  getTasks,
  getTask,
  createTasks,
  updateTasks,
  deleteTasks,
} from "../controllers/taskcontroller.js";

import {
  registerUser,
  loginUser,
  currentUser,
} from "../controllers/usercontroller.js";
 import validateToken from "../middleware/validateTokenHandler.js";

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/current",currentUser);

router.use(validateToken)

router.post("/create-task", createTasks);
router.get("/get-tasks", getTasks);
router.get("/user", getTask);
router.put("/update-task/:id", updateTasks);
router.delete("/delete-task/:id", deleteTasks);



export default router;
