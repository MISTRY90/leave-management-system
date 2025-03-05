const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) return res.status(400).json({ error: 'Email already exists' });

    const employee = new Employee({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role
    });

    await employee.save();
    const token = jwt.sign({ _id: employee._id }, process.env.JWT_SECRET);
    res.status(201).json({ employee, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    if (!employee) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ _id: employee._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};