const Leave = require('../models/Leave');
const Employee = require('../models/Employee');
const getDays = (start, end) => Math.ceil((end - start) / (1000 * 3600 * 24)) + 1;

exports.updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.leaveId);
    if (!leave) return res.status(404).json({ error: 'Leave not found' });

    if (leave.managerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (req.body.status === 'Approved') {
      const days = getDays(leave.startDate, leave.endDate);
      const employee = await Employee.findById(leave.employeeId);
      employee.leaveBalance[leave.leaveType.toLowerCase()] -= days;
      await employee.save();
    }

    leave.status = req.body.status;
    leave.managerComments = req.body.managerComments;
    await leave.save();
    res.json(leave);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};