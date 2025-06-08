const User = require('../models/User');

// Search Alumni (only approved)
const searchAlumni = async (req, res) => {
  const { name, jobRole, tech, location } = req.query;
  const query = { role: 'alumni', isApproved: true };

  if (name) query.fullName = { $regex: name, $options: 'i' };
  if (jobRole) query.jobRole = { $regex: jobRole, $options: 'i' };
  if (tech) query.domains = { $in: tech.split(',') };
  if (location) query.location = { $regex: location, $options: 'i' };

  try {
    const alumni = await User.find(query).select('-password');
    if (!alumni.length) return res.status(404).json({ message: 'No alumni found' });
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching alumni', error: err.message });
  }
};

// Search Students (only approved)
const searchStudents = async (req, res) => {
  const { name, tech } = req.query;
  const query = { role: 'student', isApproved: true };

  if (name) query.fullName = { $regex: name, $options: 'i' };
  if (tech) query.domains = { $in: tech.split(',') };

  try {
    const students = await User.find(query).select('-password');
    if (!students.length) return res.status(404).json({ message: 'No students found' });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students', error: err.message });
  }
};

module.exports = { searchAlumni, searchStudents };
