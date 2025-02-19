import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

const Sidebar = () => {

  const navigate = useNavigate();

  const handleOnClick = async ()=>{
    try{
      const res = await axios.post('http://localhost:5173/users/logout', {withCredentials: true});
      console.log(res);
      alert("You Logged Out Successfully!");
      navigate('/');
    }catch(e){
      console.log(e);
    }
  }




  return (
    <div  className="fontstyle" style={{ width: "250px", backgroundColor: "#1976D2", color: "white", minHeight: "100vh", padding: "20px" }}>
      <h5 className="text-center mb-3 fs-4 fw-bold">Task Manager</h5>
      <hr className="border-white" />
      <ul className="list-unstyled">
        <li>
          <Link to="/" className="d-flex align-items-center text-white text-decoration-none py-2 px-3">
            <i className="bi bi-house-door-fill me-2" style={{ fontSize: "20px" }}></i>
            <span><i className="fa-solid fa-house"></i> Home</span>
          </Link>
        </li>

        <li>
          <Link to="#" className="d-flex align-items-center text-white text-decoration-none py-2 px-3">
            <i className="bi bi-list-ul me-2" style={{ fontSize: "20px" }}></i>
            <span><i className="fa-solid fa-list-check"></i> My Tasks</span>
          </Link>
        </li>

        <li>
          <Link to="#" className="d-flex align-items-center text-white text-decoration-none py-2 px-3">
            <i className="bi bi-gear-fill me-2" style={{ fontSize: "20px" }}></i>
            <span><i className="fa-solid fa-gear"></i> Settings</span>
          </Link>
        </li>

        <li>
          <Link onClick={handleOnClick}  to="/login" className="d-flex align-items-center text-white text-decoration-none py-2 px-3">
            <i className="bi bi-box-arrow-right me-2" style={{ fontSize: "20px" }}></i>
            <span><i className="fa-solid fa-right-from-bracket"></i> Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
