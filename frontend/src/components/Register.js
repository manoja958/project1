import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../App.css';
import './Register.css';

function Registration() {
  const [formData, setFormData] = useState({
    empId: '',
    name: '',
    designation: '',
    ugQualification: '',
    pgQualification: '',
    department: '',
    dob: '',
    doj: '',
    previousExperience: '',
    email: '',
    password: '',
  });
  const [photo, setPhoto] = useState(null);
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (photo) data.append('photo', photo);

      const res = await axios.post('http://localhost:5000/api/employees/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMsg(res.data.message || 'Employee Registered Successfully ✅');

      setFormData({
        empId: '',
        name: '',
        designation: '',
        ugQualification: '',
        pgQualification: '',
        department: '',
        dob: '',
        doj: '',
        previousExperience: '',
        email: '',
        password: '',
      });
      setPhoto(null);
    } catch (err) {
      console.error('❌ Registration Error:', err);
      setMsg('Registration Failed ❌');
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <h2>Employee Registration</h2>
        {msg && (
          <p style={{ color: msg.includes('Failed') ? 'red' : 'green', fontWeight: '600' }}>
            {msg}
          </p>
        )}
        <form onSubmit={handleSubmit} className="register-form">
          <label>Employee ID <input type="text" name="empId" value={formData.empId} onChange={handleChange} required /></label>
          <label>Name <input type="text" name="name" value={formData.name} onChange={handleChange} required /></label>
          <label>Designation <input type="text" name="designation" value={formData.designation} onChange={handleChange} required /></label>
          <label>UG Qualification <input type="text" name="ugQualification" value={formData.ugQualification} onChange={handleChange} required /></label>
          <label>PG Qualification <input type="text" name="pgQualification" value={formData.pgQualification} onChange={handleChange} required /></label>
          <label>Department <input type="text" name="department" value={formData.department} onChange={handleChange} required /></label>
          <label>Date of Birth <input type="date" name="dob" value={formData.dob} onChange={handleChange} required /></label>
          <label>Date of Joining <input type="date" name="doj" value={formData.doj} onChange={handleChange} required /></label>
          <label>Previous Experience (Years) <input type="number" name="previousExperience" value={formData.previousExperience} onChange={handleChange} required /></label>
          <label>Email <input type="email" name="email" value={formData.email} onChange={handleChange} required /></label>
          <label>Password <input type="password" name="password" value={formData.password} onChange={handleChange} required /></label>
          <label>Upload Photo <input type="file" accept="image/*" onChange={handlePhotoChange} required /></label>

          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </>
  );
}

export default Registration;
