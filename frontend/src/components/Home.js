import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <nav className="navbar">
        <h2>Experience Tracker</h2>
        <div>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </nav>
      <h3>Welcome to Employee Experience Tracker</h3>
    </div>
  );
}
