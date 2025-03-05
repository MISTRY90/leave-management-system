const express = require('express');
const router = express.Router();
const { applyLeave, getLeaves } = require('../controllers/employeeController');
const { applyLeaveSchema } = require('../validations/leaveValidation');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

router.get('/leaves', auth, getLeaves);
router.post('/leaves/apply', auth, validate(applyLeaveSchema), applyLeave);

module.exports = router;