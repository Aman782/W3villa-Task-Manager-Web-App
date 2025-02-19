import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);

 

  // Logout function
  const handleOnClick = async () => {
    try {
      await axios.post("https://w3villa-task-manager-web-app-x945.vercel.app/users/logout", {}, { withCredentials: true });
      setLoggedIn(false);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDashboardClick = async ()=>{
      try {
        const res = await axios.get('https://w3villa-task-manager-web-app-x945.vercel.app/users/user-info', {withCredentials: true});
  
        if(res.status === 200){
          setLoggedIn(true);
          navigate('/dashboard');
        }else{
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
        navigate('/');
      }
  }



  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light text-center">
      <div className="card shadow-sm border-0 rounded-3 p-4" style={{ maxWidth: "600px" }}>
        <h2 className="fw-bold text-primary">🚀 Task Manager</h2>
        <p className="text-muted mb-4">Effortlessly manage your tasks and boost productivity.</p>
        <div className="d-flex justify-content-between">
          <Link  onClick={handleDashboardClick} to="/dashboard" className="btn btn-primary w-100 py-2 me-2">
            Go to Dashboard
          </Link>
          {isLoggedIn ? (
            <button onClick={handleOnClick} className="btn btn-outline-secondary w-100 py-2 ms-2">
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-outline-secondary w-100 py-2 ms-2">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
