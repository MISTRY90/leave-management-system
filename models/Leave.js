const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  leaveType: { type: String, enum: ['Annual', 'Sick', 'Casual'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  managerComments: String,
  appliedDate: { type: Date, default: Date.now },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }
});

module.exports = mongoose.model('Leave', leaveSchema);

