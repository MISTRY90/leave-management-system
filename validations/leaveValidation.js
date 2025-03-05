const Joi = require('joi');

const applyLeaveSchema = Joi.object({
  leaveType: Joi.string().valid('Annual', 'Sick', 'Casual').required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
  reason: Joi.string().required()
});

const updateLeaveSchema = Joi.object({
  status: Joi.string().valid('Approved', 'Rejected').required(),
  managerComments: Joi.string().when('status', {
    is: 'Rejected',
    then: Joi.required(),
    otherwise: Joi.optional()
  })
});

module.exports = { applyLeaveSchema, updateLeaveSchema };