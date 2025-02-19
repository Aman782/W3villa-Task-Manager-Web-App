import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleOnSubmit = (e)=>{
    e.preventDefault();
    
    let data = {
      email,
      password
    }

    try{
      const res = axios.post("http://localhost:5050/users/login", data, {withCredentials: true});
      alert("User LoggedIn Successfully!");
      // setLoggedIn(true);
      navigate("/dashboard");
      console.log(res.data);
    }catch(error){
      alert("Login credentials are Incorrect!, try again");
      navigate("/login");
      console.log(error);
    }

    setEmail('');
    setPassword('');
  }

  return (
    <>
      <div className="container-fluid mt-3 d-flex justify-content-center p-5 fontstyle">
        <div className="card shadow-sm col-md-5 p-4 border-3">
          <h2 className="text-center mb-4 text-primary">Login</h2>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Email
              </label>
              <input
                id={"email"}
                className="form-control"
                type="text"
                placeholder="enter email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
              ></input>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                password
              </label>
              <input
                id={"password"}
                className="form-control"
                type="password"
                placeholder="enter password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
              ></input>
            </div>
            <button className="btn btn-primary w-100" type="submit">
              Login
            </button>

            <div className="fontstyle text-center p-2">
                Do not have account, 
                 
                <Link to={"/signup"} className="text-decoration-none"> Signup here</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
