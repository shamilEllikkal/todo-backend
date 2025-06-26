import asyncHandler from "express-async-handler";
import tasks from "../models/taskModel.js";


export const getTasks = asyncHandler(async (req, res) => {
  const taskList = await tasks.find({ user_id: req.user.id });
  res.status(200).json(taskList);
});

export const createTasks = asyncHandler(async (req, res) => {
  const { taskname } = req.body;
  const task = await tasks.create({
    taskname,
    user_id: req.user.id,
  });
  res.status(200).json({ msg: task ,m:"hhh"});
});
export const getTask = asyncHandler(async (req, res) => {
  res.status(200).json({msg:"user session"})
});

export const updateTasks = asyncHandler(async (req, res) => {
  const exisitingTask = await tasks.findOne({
    _id: req.params.id,
  });

  if (!exisitingTask) {
    res.status(400);
    throw new Error("there is no existing contact");
  }
  if (exisitingTask.user_id.toString() !== req.user.id) {
    res.status(400);
    throw new Error("you do not have permisssion to modify this task");
  }
  const updatedTask = await tasks.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTask)
});

export const deleteTasks = asyncHandler(async (req, res) => {
  const task = await tasks.findOneAndDelete({
    _id: req.params.id,
    user_id: req.user.id,
  });
  if (!task) {
    return res.status(404).json({ msg: "Task not found" });
  }
  res.status(200).json({ msg: "Task deleted" });
});

export default {
  getTasks,
  createTasks,
  getTask,
  updateTasks,
  deleteTasks,
};
