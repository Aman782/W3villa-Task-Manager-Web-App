import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete UI Design",
      status: "In Progress",
      description: "Finalize UI for the task manager",
      due: "Feb 20",
    },
    {
      id: 2,
      title: "API Integration",
      status: "Pending",
      description: "Connect frontend with backend APIs",
      due: "Feb 22",
    },
    {
      id: 3,
      title: "Testing & Deployment",
      status: "Completed",
      description: "Test all features and deploy",
      due: "Feb 25",
    },
  ]);

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Modal state for TaskForm
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  const openTaskForm = () => setIsTaskFormOpen(true);
  const closeTaskForm = () => setIsTaskFormOpen(false);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    if (!isDarkMode) {
      document.body.classList.add("bg-dark", "text-light");
    } else {
      document.body.classList.remove("bg-dark", "text-light");
    }
  };

  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const userInfo = async () => {
      try {
        const res = await axios.get("http://localhost:5050/users/user-info", { withCredentials: true });

        console.log(res);
        setUsername(res.data.username);
      } catch (e) {
        console.log(e);
        alert("You are not loggedIn!");
        navigate("/login");
      }
    };
  
    userInfo();
  }, []);
  

  return (
    <div className={`d-flex min-vh-100 ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold">Dashboard</h2>
          <div className="d-flex align-items-center justify-content-evenly">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
              style={{ width: "40px", height: "40px" }}
            >
              A
            </div>
            <h6 className="mb-0">Hello, {username || "User"}!</h6>

            <div className="mx-3 mb-0" onClick={toggleTheme}>
              {isDarkMode ? (
                <i className="bi bi-sun"></i>
              ) : (
                <i className="bi bi-moon"></i>
              )}
              {isDarkMode ? <i className="fa-solid fa-toggle-on fs-4"></i> : <i className="fa-solid fa-toggle-off fs-4"></i>}
            </div>
          </div>
        </div>

        {/* Add Task Button */}
        <button className="btn btn-primary mb-3 py-2 align-items-center" onClick={openTaskForm}>
          <i className="fa-solid fa-plus"></i> Add Task
        </button>

        {/* Task List */}
        <div className="row g-3">
          {tasks.map((task) => (
            <div className="col-12 col-sm-6 col-md-4" key={task.id}>
              <TaskCard task={task} />
            </div>
          ))}
        </div>
      </div>

      {/* TaskForm Modal */}
      <TaskForm open={isTaskFormOpen} handleClose={closeTaskForm} />
    </div>
  );
};

export default Dashboard;
