// const User = require('../models/User');

// const searchAlumni = async (req, res) => {
//   const { name, jobRole, tech, location } = req.query;
//   const query = { role: 'alumni', isApproved: true };
//   if (name) query.fullName = { $regex: name, $options: 'i' };
//   if (jobRole) query.company = { $regex: jobRole, $options: 'i' };
//   if (tech) query.domains = tech;
//   if (location) query.location = { $regex: location, $options: 'i' };
//   const alumni = await User.find(query).select('-password');
//   res.json(alumni);
// };


// const searchStudents = async (req, res) => {
//   const { name, tech } = req.query;
//   const query = { role: 'student', isApproved: true };

//   if (name) query.fullName = { $regex: name, $options: 'i' }; // Case-insensitive search
//   if (tech) query.domains = { $in: [tech] }; // Searching for specific domain

//   try {
//     const students = await User.find(query).select('-password'); // Exclude password from result
//     if (students.length === 0) {
//       return res.status(404).json({ message: 'No students found' }); // Handle case with no results
//     }
//     return res.json(students);  // Returning the data array
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching students', error: err.message });
//   }
// };

// module.exports = { searchAlumni, searchStudents };

// const User = require('../models/User');

// // Search Alumni
// const searchAlumni = async (req, res) => {
//   const { name, jobRole, tech, location } = req.query;

//   const query = { role: 'student', isApproved: true };

//   if (name) query.fullName = { $regex: name, $options: 'i' }; // Partial match on name
//   if (jobRole) query.company = { $regex: jobRole, $options: 'i' }; // Partial match on company/job role
//   if (tech) query.domains = { $in: [tech] }; // Match domain from array
//   if (location) query.location = { $regex: location, $options: 'i' }; // Partial match on location

//   try {
//     const alumni = await User.find(query).select('-password');
//     if (alumni.length === 0) {
//       return res.status(404).json({ message: 'No alumni found' });
//     }
//     res.json(alumni);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching alumni', error: err.message });
//   }
// };

// // Search Students
// const searchStudents = async (req, res) => {
//   const { name, tech } = req.query;

//   const query = { role: 'student', isApproved: true };

//   if (name) query.fullName = { $regex: name, $options: 'i' }; // Partial match on name
//   if (tech) query.domains = { $in: [tech] }; // Match domain from array

//   try {
//     const students = await User.find(query).select('-password');
//     if (students.length === 0) {
//       return res.status(404).json({ message: 'No students found' });
//     }
//     res.json(students);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching students', error: err.message });
//   }
// };

// module.exports = { searchAlumni, searchStudents };
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
