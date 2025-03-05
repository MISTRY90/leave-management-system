exports.applyLeave = async (req, res) => {
    try {
      const employee = await Employee.findById(req.user._id);
      const { leaveType, startDate, endDate, reason } = req.body;
  
      // Check date validity
      if (new Date(startDate) > new Date(endDate)) {
        return res.status(400).json({ error: 'End date must be after start date' });
      }
  
      // Calculate leave days
      const timeDiff = new Date(endDate) - new Date(startDate);
      const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  
      if (employee.leaveBalance[leaveType.toLowerCase()] < days) {
        return res.status(400).json({ 
          error: `Insufficient ${leaveType} leave balance` 
        });
      }
  
      const leave = new Leave({
        employeeId: employee._id,
        leaveType,
        startDate,
        endDate,
        reason,
        managerId: employee.managerId
      });
  
      await leave.save();
      res.status(201).json(leave);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };