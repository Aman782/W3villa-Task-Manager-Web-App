import { useState } from "react";
import React from "react";

const TaskForm = ({ open, handleClose }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low"
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!task.title || !task.description) {
      alert("Title and Description are required!");
      return;
    }

    // You can add your task creation logic here, such as sending the data to an API
    console.log("Task Created:", task);

    // Reset form
    setTask({ title: "", description: "", priority: "low" });
    handleClose(); // Close the modal after submitting the form
  };

  return (
    <div className={`modal fade ${open ? "show" : ""}`} style={{ display: open ? "block" : "none" }} tabIndex="-1" aria-labelledby="taskFormLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content border-0 rounded-3 shadow-lg">
          <div className="modal-header border-bottom-0">
            <h5 className="modal-title text-primary" id="taskFormLabel">Add New Task</h5>
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="modal-body py-4">
            {/* Form fields */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label text-muted">Task Title</label>
                <input
                  type="text"
                  className="form-control form-control-lg shadow-sm"
                  id="title"
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter task title"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label text-muted">Task Description</label>
                <textarea
                  className="form-control form-control-lg shadow-sm"
                  id="description"
                  name="description"
                  rows="4"
                  value={task.description}
                  onChange={handleChange}
                  required
                  placeholder="Enter task description"
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="priority" className="form-label text-muted">Priority</label>
                <select
                  className="form-select form-select-lg shadow-sm"
                  id="priority"
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="modal-footer border-top-0 d-flex justify-content-between">
                <button type="button" className="btn btn-outline-secondary" onClick={handleClose}>Close</button>
                <button type="submit" className="btn btn-primary px-4 py-2">Add Task</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
