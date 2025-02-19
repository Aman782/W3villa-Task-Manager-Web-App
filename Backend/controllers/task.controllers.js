import mongoose from "mongoose";
import Task from "../models/task.models.js";
import User from "../models/user.models.js";


export const createNewTask = async (req, res) => {
    try {
      const { title, description, dueDate, createdBy } = req.body;
  
      if (!title || !description || !dueDate) {
        return res.status(400).json({ message: "Title, Description, and Due Date are required!" });
      }
  
      if (!mongoose.Types.ObjectId.isValid(createdBy)) {
        return res.status(400).json({ message: "Invalid user ID!" });
      }
  
      const task = new Task(req.body);
      const savedTask = await task.save();
      
      //updating user tasks array
      await User.findByIdAndUpdate(createdBy, { $push: { tasks: task._id } });

      console.log(savedTask);
      res.status(201).json(savedTask);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  export const getTasks = async (req, res) => {
    try {
      const userId = req.user?._id; 
  
      if (!userId) {
        return res.status(400).json({ message: "User not authenticated!" });
      }
  
      const user = await User.findById(userId).populate("tasks");
  
      if (!user || !user.tasks.length) {
        return res.status(404).json({ message: "No tasks found!" });
      }
  
      return res.status(200).json({ tasks: user.tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  export const updateTask = async (req, res) => {
    try {
      console.log("Received Request Body:", req.body); 
  
      const { _id, title, description, dueDate, priority, status } = req.body;
  
      if (!_id) {
        return res.status(400).json({ message: "Task ID is required!" });
      }
  
      const task = await Task.findById(_id);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found!" });
      }
  
      if (title) task.title = title;
      if (description) task.description = description;
      if (dueDate) task.dueDate = dueDate;
      if (priority) task.priority = priority;
      if (status) task.status = status;
  
      await User.updateOne(
        { _id: task.createdBy, "tasks._id": _id },
        { $set: { "tasks.$": task } }
      );
  
      await task.save({ validateBeforeSave: false });
  
      res.status(200).json({ message: "Task updated successfully!", task });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

  export const deletedTask = async (req, res) => {
    try {
      console.log("Received request body:", req.body);
  
      
      const taskId = req.body._id;
      console.log("task Id ", taskId);


      const userId = req.user._id;
      console.log("user Id", userId);
  
      if (!taskId || !userId) {
        return res.status(400).json({ message: "Task ID and User ID are required!" });
      }
 
      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found!" });
      }
  
      await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });
  
      res.status(200).json({ message: "Task deleted successfully!", deletedTask: deletedTask });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };