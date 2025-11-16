import React from "react";
import { Link } from "react-router-dom";
//import "./styles.css";
import './Navbar.css';
export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>Experience Tracker</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}
