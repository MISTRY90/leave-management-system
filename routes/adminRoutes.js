const express = require('express');
const router = express.Router();
const { createEmployee, updateEmployee, deleteEmployee } = require('../controllers/adminController');
const { employeeSchema } = require('../validations/employeeValidation');
const auth = require('../middleware/auth');
const restrictTo = require('../middleware/restrictTo');
const validate = require('../middleware/validate');

// Create a new employee
router.post('/employees', auth, restrictTo('Admin'), validate(employeeSchema), createEmployee);

// Update employee details
router.put('/employees/:employeeId', auth, restrictTo('Admin'), validate(employeeSchema), updateEmployee);

// Delete an employee
router.delete('/employees/:employeeId', auth, restrictTo('Admin'), deleteEmployee);

module.exports = router;