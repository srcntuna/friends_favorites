import React from "react";
import LoginForm from "./loginForm";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignUpForm from "./signUpForm";
import UserHome from "./UserHome";
import IndvPost from "./indvPost";
import "../styles/App.css";

function App() {
  return (
    <div className="App">
      <div className="navBar">
        <div>WELCOME TO Friend's Favs</div>
      </div>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route exact path="/register" element={<SignUpForm />} />
        <Route exact path="/home" element={<UserHome />} />
        <Route exact path="/post/:id" element={<IndvPost />} />
      </Routes>
    </div>
  );
}

export default App;
