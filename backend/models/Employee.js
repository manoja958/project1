const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  empId: String,
  name: String,
  designation: String,
  ugQualification: String,
  pgQualification: String,
  department: String,
  dob: Date,
  doj: Date,
  previousExperience: Number,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String } // stores filename
});

module.exports = mongoose.model('Employee', employeeSchema);
