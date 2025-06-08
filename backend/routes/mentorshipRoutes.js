const express = require('express');
const router = express.Router();
const {
  requestMentorship,
  getMentorshipRequests,
  updateMentorshipRequest,
} = require('../controllers/mentorshipController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['student']),
  requestMentorship
);
router.get('/', authMiddleware, getMentorshipRequests);
router.put(
  '/',
  authMiddleware,
  updateMentorshipRequest
);

module.exports = router;