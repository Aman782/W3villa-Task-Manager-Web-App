import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Task Manager</span>
        <button className="btn btn-light">
          <Link to="/logout" className="text-decoration-none text-dark">Logout</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
