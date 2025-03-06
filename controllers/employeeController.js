const Leave = require('../models/Leave');
const Employee = require('../models/Employee');

exports.getLeaves = async (req, res) => {
    try {
      const leaves = await Leave.find({ employeeId: req.user._id });
      res.json(leaves);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  exports.applyLeave = async (req, res) => {
    try {
      const employee = await Employee.findById(req.user._id);
      const { leaveType, startDate, endDate, reason } = req.body;
  
      // Debugging: Log the employee and managerId
      console.log('Employee:', employee);
      console.log('Manager ID:', employee.managerId);
  
      // Check if employee has a manager
      if (!employee.managerId) {
        return res.status(400).json({ error: 'Employee does not have a manager assigned' });
      }
  
      // Check date validity
      if (new Date(startDate) > new Date(endDate)) {
        return res.status(400).json({ error: 'End date must be after start date' });
      }
  
      // Calculate leave days
      const timeDiff = new Date(endDate) - new Date(startDate);
      const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  
      // Check leave balance
      if (employee.leaveBalance[leaveType.toLowerCase()] < days) {
        return res.status(400).json({ 
          error: `Insufficient ${leaveType} leave balance` 
        });
      }
  
      // Create leave request
      const leave = new Leave({
        employeeId: employee._id,
        leaveType,
        startDate,
        endDate,
        reason,
        managerId: employee.managerId // Ensure this is populated
      });
  
      await leave.save();
      res.status(201).json(leave);
    } catch (error) {
      console.error('Error applying leave:', error); // Debugging: Log the error
      res.status(400).json({ error: error.message });
    }
  };