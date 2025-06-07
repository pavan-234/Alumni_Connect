// const express = require('express');
// const router = express.Router();
// const { signup, login, getProfile, updateProfile, approveUser, deleteUser, createAdmin, getAdminDashboard } = require('../controllers/userController');
// const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// // Public routes
// router.post('/signup', signup);
// router.post('/login', login);

// // Protected routes
// router.get('/profile', authMiddleware, roleMiddleware(['student', 'alumni']), getProfile);
// router.put('/profile', authMiddleware, roleMiddleware(['student', 'alumni']), updateProfile);

// // Admin routes
// router.post('/approve/:userId', authMiddleware, roleMiddleware(['admin']), approveUser);
// router.delete('/:userId', authMiddleware, roleMiddleware(['admin']), deleteUser);
// router.post('/admin', authMiddleware, roleMiddleware(['admin']), createAdmin);
// router.get('/admin/dashboard', authMiddleware, roleMiddleware(['admin']), getAdminDashboard);

// module.exports = router;
const express = require('express');
const router = express.Router();

const {
  signup,
  login,
  getProfile,
  updateProfile,
  // approveUser, // uncomment if implemented
  // deleteUser,
  // createAdmin,
  // getAdminDashboard,
} = require('../controllers/userController');

const {
  authMiddleware,
  // approvalRequired, // removed based on no approval workflow
  roleMiddleware,
} = require('../middleware/auth');

// ----------------------
// Public Routes
// ----------------------
router.post('/signup', signup);
router.post('/login', login);

// ----------------------
// Protected Routes (Student & Alumni)
// Require: Authentication and Role Check
// ----------------------
router.get(
  '/profile',
  authMiddleware,
  roleMiddleware(['student', 'alumni']),
  getProfile
);

router.put(
  '/profile',
  authMiddleware,
  roleMiddleware(['student', 'alumni']),
  updateProfile
);

// ----------------------
// Admin Routes (optional - uncomment if you implement)
// ----------------------
// router.post(
//   '/approve/:userId',
//   authMiddleware,
//   roleMiddleware(['admin']),
//   approveUser
// );

// router.delete(
//   '/:userId',
//   authMiddleware,
//   roleMiddleware(['admin']),
//   deleteUser
// );

// router.post(
//   '/admin',
//   authMiddleware,
//   roleMiddleware(['admin']),
//   createAdmin
// );

// router.get(
//   '/admin/dashboard',
//   authMiddleware,
//   roleMiddleware(['admin']),
//   getAdminDashboard
// );

module.exports = router;
