const express = require('express');
const router = express.Router();
const { updateLeave } = require('../controllers/managerController');
const { updateLeaveSchema } = require('../validations/leaveValidation');
const auth = require('../middleware/auth');
const restrictTo = require('../middleware/restrictTo');
const validate = require('../middleware/validate');

router.put('/leaves/:leaveId', 
  auth, 
  restrictTo('Manager'), 
  validate(updateLeaveSchema), 
  updateLeave
);

module.exports = router;