// // const express = require('express');
// // const router = express.Router();
// // const { requestMentorship, getMentorshipRequests, updateMentorshipRequest } = require('../controllers/mentorshipController');
// // const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// // router.post('/', authMiddleware, roleMiddleware(['student']), requestMentorship);
// // router.get('/', authMiddleware, roleMiddleware(['alumni']), getMentorshipRequests);
// // router.put('/', authMiddleware, roleMiddleware(['alumni']), updateMentorshipRequest);

// // module.exports = router;
// const express = require('express');
// const router = express.Router();

// const {
//   requestMentorship,
//   getMentorshipRequests,
//   updateMentorshipRequest,
// } = require('../controllers/mentorshipController');
// const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// // Student sends mentorship request to alumni
// router.post(
//   '/',
//   authMiddleware,
//   roleMiddleware(['student']),
//   requestMentorship
// );

// // Alumni views incoming mentorship requests
// router.get(
//   '/',
//   authMiddleware,
//   roleMiddleware(['alumni']),
//   getMentorshipRequests
// );

// router.get(
//   '/',
//   authMiddleware,
//   roleMiddleware(['student']),
//   getMentorshipRequests
// );

// // Alumni updates mentorship request status (accept/reject)
// router.put(
//   '/',
//   authMiddleware,
//   roleMiddleware(['alumni']),
//   updateMentorshipRequest
// );

// module.exports = router;


































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