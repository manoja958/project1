const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Employee = require('../models/Employee');

const router = express.Router();

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Register Employee
router.post('/register', upload.single('photo'), async (req, res) => {
  try {
    console.log("📥 Registration data:", req.body);
    console.log("📸 File uploaded:", req.file);

    const newEmployee = new Employee({
      ...req.body,
      photo: req.file ? req.file.filename : null,
    });

    await newEmployee.save();
    res.json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

// ✅ Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const emp = await Employee.findOne({ email, password });
    if (!emp) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    res.json({ success: true, employee: emp });
  } catch {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// ✅ Admin Login
router.post('/admin', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@tracker.com' && password === 'admin123') {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  }
});

// ✅ Search Employee
router.get('/search/:empId', async (req, res) => {
  try {
    const emp = await Employee.findOne({ empId: req.params.empId });
    if (!emp) return res.status(404).json({ message: 'Not found' });
    res.json(emp);
  } catch {
    res.status(500).json({ message: 'Error searching employee' });
  }
});

module.exports = router;
