// // const express = require('express');
// // const router = express.Router();
// // const { postJob, getJobs } = require('../controllers/jobController');
// // const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// // router.post('/', authMiddleware, roleMiddleware(['alumni']), postJob);
// // router.get('/', authMiddleware, roleMiddleware(['student']), getJobs);

// // module.exports = router;
// const express = require('express');
// const router = express.Router();

// const { postJob, getJobs } = require('../controllers/jobController');
// const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// // Alumni can post new job opportunities
// router.post(
//   '/',
//   authMiddleware,
//   roleMiddleware(['alumni']),
//   postJob
// );

// // Students can view available job opportunities
// router.get(
//   '/',
//   authMiddleware,
//   roleMiddleware(['student']),
//   getJobs
// );

// module.exports = router;









const express = require('express');
const router = express.Router();

const { postJob, getJobs } = require('../controllers/jobController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Alumni can post new job opportunities
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['alumni']),
  postJob
);

// Students can view available job opportunities
router.get(
  '/',
  authMiddleware,
  roleMiddleware(['student']),
  getJobs
);

module.exports = router;