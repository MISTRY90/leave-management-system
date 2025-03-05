const Joi = require('joi');

// for admin only

const employeeSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('Employee', 'Manager', 'HR', 'Admin').required(),
  managerId: Joi.string().optional(),
  leaveBalance: Joi.object({
    annual: Joi.number().min(0).required(),
    sick: Joi.number().min(0).required(),
    casual: Joi.number().min(0).required()
  }).optional()
});

module.exports = { employeeSchema };