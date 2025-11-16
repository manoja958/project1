const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Register a new employee
router.post('/register', async (req, res) => {
  try {
    // Convert DOB and DOJ to Date objects
    if (req.body.dob) req.body.dob = new Date(req.body.dob);
    if (req.body.doj) req.body.doj = new Date(req.body.doj);

    const newEmp = new Employee(req.body);
    await newEmp.save();

    res.status(201).send('Registered successfully');
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).send('Error: ' + err.message);
  }
});

// Search by Employee ID
router.get('/search/:empId', async (req, res) => {
  try {
    const emp = await Employee.findOne({ empId: req.params.empId });
    if (!emp) return res.status(404).send('Employee not found');
    res.json(emp);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).send('Error: ' + err.message);
  }
});

module.exports = router;
