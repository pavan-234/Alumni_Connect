// const express = require('express');
// const router = express.Router();
// const { sendMessage, getMessages } = require('../controllers/messageController');
// const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// router.post('/', authMiddleware, roleMiddleware(['student', 'alumni']), sendMessage);
// router.get('/:userId', authMiddleware, roleMiddleware(['student', 'alumni']), getMessages);

// module.exports = router;
const express = require('express');
const router = express.Router();

const { sendMessage, getMessages } = require('../controllers/messageController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Send message (students and alumni)
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['student', 'alumni']),
  sendMessage
);

// Get messages between logged-in user and another user
router.get(
  '/:userId',
  authMiddleware,
  roleMiddleware(['student', 'alumni']),
  getMessages
);

module.exports = router;
