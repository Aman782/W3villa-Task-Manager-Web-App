import React, { useState } from "react";
import axios from "axios";


const TaskCard = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  // const [currentUser, setCurrentUser] = useState({});

  const formatDate = (isoDate) => new Date(isoDate).toLocaleDateString("en-GB"); // DD/MM/YYYY

  const handleEditClick = () => {
    setIsEditing(true);
  };

  // useEffect(() => {
  //   const userInfo = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5050/users/user-info", { withCredentials: true });

  //       console.log(res);
        
  //     setCurrentUser(res.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   userInfo();
  // }, []);

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleUpdateTask = async () => {
    console.log("Edited Task Before Sending:", editedTask); 
  
    try {
      const updatedTask = await axios.post(
        "http://localhost:5050/users/update-task",
        editedTask, 
        { withCredentials: true }
      );
  
      console.log("After updating Task in database!", updatedTask);
  
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message);
    }
  };
  

  const handleOnDelete = async () => {
    try {
      const deletedTask = await axios.post('http://localhost:5050/users/delete-task', task, {withCredentials: true});
  
      console.log("deleted Task", deletedTask);
      alert("Task Deleted Successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <div className="card border-radius-5 shadow-sm position-relative fontstyle" style={{ maxWidth: "300px", marginBottom: "20px" }}>
        <div className="card-body">
          <h6 className="card-title font-weight-bold">{task.title}</h6>
          <p className="card-text text-muted">{task.description}</p>
          <p>Due Date: {formatDate(task.dueDate)}</p>
          <p>Priority: <strong>{task.priority}</strong></p>

          {/* Task Status */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className={`badge ${task.status === "Completed" ? "bg-success" : "bg-warning"}`}>
              {task.status}
            </span>

            <div>
              <button onClick={handleEditClick} className="btn btn-link p-0 me-2 fs-5">
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button className="btn btn-link p-0 me-2 fs-5" onClick={handleOnDelete}>
                <i className="fa-solid fa-trash text-black"></i>
              </button>
              <button className="btn btn-link p-0 fs-5">
                <i className="fa-solid fa-circle-check text-success"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Editing Task */}
      {isEditing && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content border-0 rounded-3 shadow-lg">
              <div className="modal-header border-bottom-0">
                <h5 className="modal-title text-primary">Edit Task</h5>
                <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
              </div>
              <div className="modal-body py-4">
                <form>
                  <div className="mb-3">
                    <label className="form-label text-muted">Task Title</label>
                    <input type="text" className="form-control" name="title" value={editedTask.title} onChange={handleChange} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-muted">Task Description</label>
                    <textarea className="form-control" name="description" value={editedTask.description} onChange={handleChange} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-muted">Due Date</label>
                    <input type="date" className="form-control" name="dueDate" value={editedTask.dueDate} onChange={handleChange} required />
                  </div>

                  {/* Priority Field */}
                  <div className="mb-3">
                    <label className="form-label text-muted">Priority</label>
                    <select className="form-control" name="priority" value={editedTask.priority} onChange={handleChange}>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div className="modal-footer border-top-0 d-flex justify-content-between">
                    <button type="button" className="btn btn-outline-secondary" onClick={handleClose}>
                      Close
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleUpdateTask}>
                      Update Task
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
