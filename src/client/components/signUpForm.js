import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function SignUpForm() {
  const [signupDetails, setSignUpDetails] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [signUpStatus, setSignUpStatus] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    Axios.post("/api/insert", { signupDetails }).then((response) => {
      setSignUpStatus(response.data.message);
    });
  };

  return (
    <div>
      <form action="" className="SignUpForm" onSubmit={submitHandler}>
        <div className="form-inner">
          <h2>Sign Up</h2>
          <button type="button" onClick={() => alert("TEST YEAH!")}>
            Click Me!
          </button>
          <div className="form-group">
            <label htmlFor="username">Full Name:</label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter your fullname"
              onChange={(e) =>
                setSignUpDetails({ ...signupDetails, fullname: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your username"
              onChange={(e) =>
                setSignUpDetails({ ...signupDetails, username: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your email"
              onChange={(e) =>
                setSignUpDetails({ ...signupDetails, email: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="name"
              placeholder="Enter your password"
              onChange={(e) =>
                setSignUpDetails({ ...signupDetails, password: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password Confirmation:</label>
            <input
              type="password"
              name="name"
              placeholder="Enter your password again"
              onChange={(e) =>
                setSignUpDetails({
                  ...signupDetails,
                  passwordConfirm: e.target.value,
                })
              }
            />
          </div>
          <p>{signUpStatus}</p>
          <button>
            <Link to="/">Back</Link>
          </button>
          <input type="submit" value="SIGNUP" />
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
