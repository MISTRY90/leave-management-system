const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Employee', 'Manager', 'HR', 'Admin'], default: 'Employee' },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  leaveBalance: {
    annual: { type: Number, default: 12 },
    sick: { type: Number, default: 8 },
    casual: { type: Number, default: 6 }
  }
});

module.exports = mongoose.model('Employee', employeeSchema);