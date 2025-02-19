import { Link } from "react-router-dom";
import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="card border-radius-5 shadow-sm position-relative fontstyle" style={{ maxWidth: "300px", marginBottom: "20px" }}>
      <div className="card-body">
        <h6 className="card-title font-weight-bold">{task.title}</h6>
        <p className="card-text text-muted">{task.description}</p>
        <small className="text-muted">Due: {task.due}</small>

        {/* Task Status */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className={`badge ${task.status === "Completed" ? "bg-success" : "bg-warning"}`}>
            {task.status}
          </span>

          <div>
            <button className="btn btn-link p-0 me-2 fs-5"><i className="fa-solid fa-pen-to-square"></i></button>
            <button className="btn btn-link p-0 me-2 fs-5"> <i className="fa-solid fa-trash text-black"></i></button>
            <button className="btn btn-link p-0 fs-5"><i className="fa-solid fa-circle-check text-success"></i> </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
