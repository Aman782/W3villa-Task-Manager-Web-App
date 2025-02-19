import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const TaskForm = ({ open, handleClose }) => {
  const [user, setUser] = useState(null);
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    createdBy: null, 
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:5050/users/user-info", {
          withCredentials: true,
        });

        console.log("Fetched User:", res.data);
        setUser(res.data);

        setTask((prevTask) => ({
          ...prevTask,
          createdBy: res.data._id,
        }));
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    getUser();
  }, []);   

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.title || !task.description || !task.dueDate || !task.createdBy) {
      alert("All fields, including createdBy, are required!");
      return;
    }

    console.log("Task Created:", task);

    try {
      const res = await axios.post(
        "http://localhost:5050/users/new-task",
        task,
        { withCredentials: true }
      );

      console.log("Task Successfully Created:", res.data);

      // Reset form
      setTask({
        title: "",
        description: "",
        priority: "low",
        dueDate: "",
        createdBy: user ? user._id : null,
      });

      handleClose();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div
      className={`modal fade ${open ? "show" : ""}`}
      style={{ display: open ? "block" : "none" }}
      tabIndex="-1"
      aria-labelledby="taskFormLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content border-0 rounded-3 shadow-lg">
          <div className="modal-header border-bottom-0">
            <h5 className="modal-title text-primary" id="taskFormLabel">
              Add New Task
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body py-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label text-muted">
                  Task Title
                </label>
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
                <label htmlFor="description" className="form-label text-muted">
                  Task Description
                </label>
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
                <label htmlFor="priority" className="form-label text-muted">
                  Priority
                </label>
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

              <div className="mb-3">
                <label htmlFor="dueDate" className="form-label text-muted">
                  Due Date
                </label>
                <input
                  type="date"
                  className="form-control form-control-lg shadow-sm"
                  id="dueDate"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="modal-footer border-top-0 d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary px-4 py-2">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
