import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../styles/LoginForm.css";

function LoginForm() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState("");

  console.log(loginDetails);

  const submitHandler = () => {
    Axios.post("http://localhost:3001/api/login", { loginDetails }).then(
      (response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
          setTimeout(() => {
            setLoginStatus("");
          }, 1000);
        } else {
          console.log("HEYY here");
          localStorage.setItem("accessToken", response.data);
          navigate("/home");
        }
      }
    );

    // console.log(loginDetails);
  };

  return (
    <div className="LoginForm-container">
      <div className="LoginForm">
        <div className="form-inner">
          <h2>Login</h2>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your username"
              onChange={(e) => {
                setLoginDetails({ ...loginDetails, username: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="name"
              id="password"
              placeholder="Enter your password"
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, password: e.target.value })
              }
            />
          </div>
          <p>{loginStatus}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              submitHandler();
            }}
          >
            LOGIN
          </button>
        </div>
      </div>
      <p>Don't have an account?</p>
      <button>
        <Link to="/register">Sign up</Link>
      </button>
    </div>
  );
}

export default LoginForm;
