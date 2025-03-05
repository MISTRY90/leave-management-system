const express = require('express');
const router = express.Router();
const { generateReport } = require('../controllers/hrController');
const auth = require('../middleware/auth');
const restrictTo = require('../middleware/restrictTo');

// Generate leave report for all employees
router.get('/leaves/report', auth, restrictTo('HR'), generateReport);

module.exports = router;