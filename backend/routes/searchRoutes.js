// const express = require('express');
// const router = express.Router();
// const { searchAlumni, searchStudents } = require('../controllers/searchController');
// const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// router.get('/alumni', authMiddleware, roleMiddleware(['student']), searchAlumni);
// router.get('/students', authMiddleware, roleMiddleware(['alumni']), searchStudents);

// module.exports = router;
const express = require('express');
const router = express.Router();

const { searchAlumni, searchStudents } = require('../controllers/searchController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Students can search Alumni
router.get(
  '/alumni',
  authMiddleware,
  roleMiddleware(['student']),
  searchAlumni
);

// Alumni can search Students
router.get(
  '/students',
  authMiddleware,
  roleMiddleware(['alumni']),
  searchStudents
);

module.exports = router;
