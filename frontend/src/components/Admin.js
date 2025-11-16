import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Admin.css';
import "../App.css";

// Utility function to calculate Y/M/D difference
function calculateYMD(startDate) {
  const start = new Date(startDate);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years < 0) return "0 years 0 months 0 days";
  return `${years} years ${months} months ${days} days`;
}

// Total Experience = Current Org Experience + Previous
function calculateTotalExperience(doj, prevExp) {
  const currentExp = calculateYMD(doj);
  const [years, months, days] = currentExp.match(/\d+/g).map(Number);
  const totalYears = years + Math.floor(prevExp);
  const totalMonths = months + Math.round((prevExp % 1) * 12);

  const finalYears = totalYears + Math.floor(totalMonths / 12);
  const finalMonths = totalMonths % 12;

  return `${finalYears} years ${finalMonths} months ${days} days`;
}

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [empId, setEmpId] = useState('');
  const [data, setData] = useState(null);

  // Hardcoded admin credentials
  const ADMIN_EMAIL = 'admin@gmail.com';
  const ADMIN_PASS = 'admin1234';

  // Handle admin login
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email === ADMIN_EMAIL && loginData.password === ADMIN_PASS) {
      setIsLoggedIn(true);
      setMsg('');
    } else {
      setMsg('Invalid Admin Credentials ❌');
    }
  };

  // Search employee by ID
  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/employees/search/${empId}`);
      setData(res.data);
      setMsg('');
    } catch {
      setData(null);
      setMsg('Employee not found ❌');
    }
  };

  // -------------------- LOGIN SCREEN --------------------
  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <div className="admin-container">
          <h2>Admin Login</h2>
          {msg && <p className="admin-message" style={{ color: 'red' }}>{msg}</p>}

          <form onSubmit={handleLogin} className="admin-login-form">
            <label>Email:</label>
            <input
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />

            <label>Password:</label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />

            <button type="submit">Login</button>
          </form>
        </div>
      </>
    );
  }

  // -------------------- DASHBOARD SCREEN --------------------
  return (
    <>
      <Navbar />
      <div className="admin-container">
        <h2>Welcome, Admin</h2>
        <p>Search employee details below</p>

        <div className="admin-search-box">
          <input
            type="text"
            className="admin-input"
            placeholder="Enter Employee ID"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
          />
          <button onClick={handleSearch} className="admin-button">Search</button>
        </div>

        {msg && (
          <p className="admin-message" style={{ color: msg.includes('not') ? 'red' : 'green' }}>
            {msg}
          </p>
        )}

        {data && (
          <div className="admin-details">
            {data.photo && (
              <div className="photo-container">
                <img
                  src={`http://localhost:5000/uploads/${data.photo}`}
                  alt="Employee"
                  className="employee-photo"
                />
              </div>
            )}

            <table className="admin-table">
              <tbody>
                <tr><th>Employee ID</th><td>{data.empId}</td></tr>
                <tr><th>Name</th><td>{data.name}</td></tr>
                <tr><th>Email</th><td>{data.email}</td></tr>
                <tr><th>Designation</th><td>{data.designation}</td></tr>
                <tr><th>UG Qualification</th><td>{data.ugQualification}</td></tr>
                <tr><th>PG Qualification</th><td>{data.pgQualification}</td></tr>
                <tr><th>Department</th><td>{data.department}</td></tr>
                <tr>
                  <th>Date of Birth</th>
                  <td>{data.dob.slice(0, 10)} <br /> (Age: {calculateYMD(data.dob)})</td>
                </tr>
                <tr><th>Date of Joining</th><td>{data.doj.slice(0, 10)}</td></tr>
                <tr><th>Experience in Current Org</th><td>{calculateYMD(data.doj)}</td></tr>
                <tr><th>Previous Experience</th><td>{data.previousExperience} years</td></tr>
                <tr><th>Total Experience</th><td>{calculateTotalExperience(data.doj, data.previousExperience)}</td></tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Admin;
