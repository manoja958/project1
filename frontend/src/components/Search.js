import React from 'react';
import './Search.css';

function calculateYMD(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  if (days < 0) { months--; days += 30; }
  if (months < 0) { years--; months += 12; }
  return `${years} years ${months} months ${days} days`;
}

function calculateTotalExperience(doj, prevExp) {
  const currentExp = calculateYMD(doj);
  const [y, m, d] = currentExp.match(/\d+/g).map(Number);
  const totalYears = y + Math.floor(prevExp);
  const totalMonths = m + Math.round((prevExp % 1) * 12);
  return `${totalYears + Math.floor(totalMonths / 12)} years ${totalMonths % 12} months ${d} days`;
}

function Search({ user }) {
  return (
    <div className="search-container">
      <h2>Welcome, {user.name}</h2>
      <table className="result-table">
        <tbody>
          <tr><th>Employee ID</th><td>{user.empId}</td></tr>
          <tr><th>Email</th><td>{user.email}</td></tr>
          <tr><th>Designation</th><td>{user.designation}</td></tr>
          <tr><th>Department</th><td>{user.department}</td></tr>
          <tr><th>Date of Birth</th><td>{user.dob.slice(0,10)} ({calculateYMD(user.dob)})</td></tr>
          <tr><th>Date of Joining</th><td>{user.doj.slice(0,10)}</td></tr>
          <tr><th>Experience (Current)</th><td>{calculateYMD(user.doj)}</td></tr>
          <tr><th>Previous Experience</th><td>{user.previousExperience} years</td></tr>
          <tr><th>Total Experience</th><td>{calculateTotalExperience(user.doj, user.previousExperience)}</td></tr>
        </tbody>
      </table>
    </div>
  );
}

export default Search;
