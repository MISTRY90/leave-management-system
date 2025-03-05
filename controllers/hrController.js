const Leave = require('../models/Leave');
const Employee = require('../models/Employee');

// Generate leave report for all employees
exports.generateReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Validate query parameters
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }

    // Generate report
    const report = await Leave.aggregate([
      {
        $match: {
          startDate: { $gte: new Date(startDate) },
          endDate: { $lte: new Date(endDate) }
        }
      },
      {
        $group: {
          _id: "$employeeId",
          totalLeaves: { $sum: 1 },
          approvedLeaves: { 
            $sum: { $cond: [{ $eq: ["$status", "Approved"] }, 1, 0] } 
          },
          rejectedLeaves: {
            $sum: { $cond: [{ $eq: ["$status", "Rejected"] }, 1, 0] }
          }
        }
      },
      {
        $lookup: {
          from: 'employees',
          localField: '_id',
          foreignField: '_id',
          as: 'employeeDetails'
        }
      },
      {
        $unwind: "$employeeDetails"
      },
      {
        $project: {
          _id: 0,
          employeeId: "$_id",
          employeeName: "$employeeDetails.name",
          totalLeaves: 1,
          approvedLeaves: 1,
          rejectedLeaves: 1
        }
      }
    ]);

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};