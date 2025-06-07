// // const Job = require('../models/Job');

// // const postJob = async (req, res) => {
// //   const { title, description, type, location, duration, applyLink } = req.body;
// //   if (!title || !description || !type || !location || !duration || !applyLink) {
// //     return res.status(400).json({ message: 'Missing required fields' });
// //   }
// //   const job = new Job({ postedBy: req.user._id, title, description, type, location, duration, applyLink });
// //   await job.save();
// //   res.status(201).json({ message: 'Job posted', job });
// // };

// // // const getJobs = async (req, res) => {
// // //   const jobs = await Job.find().populate('postedBy', 'fullName company');
// // //   res.json(jobs);
// // // };
// // const getJobs = async (req, res) => {
// //   const jobs = await Job.find().populate('postedBy', 'fullName company');
// //   res.json(jobs); // ✅ MUST return an array
// // };


// // module.exports = { postJob, getJobs };
// const Job = require('../models/Job');

// const postJob = async (req, res) => {
//   try {
//     const { title, description, type, location, duration, applyLink } = req.body;
//     if (!title || !description || !type || !location || !duration || !applyLink) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const job = new Job({
//       postedBy: req.user._id,
//       title,
//       description,
//       type,
//       location,
//       duration,
//       applyLink,
//     });

//     await job.save();
//     res.status(201).json({ message: 'Job posted', job });
//   } catch (error) {
//     console.error('Post job error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const getJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find().populate('postedBy', 'fullName company');
//     res.json(jobs); // Returns array of jobs with poster's name and company
//   } catch (error) {
//     console.error('Get jobs error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { postJob, getJobs };




const Job = require('../models/Job');

const postJob = async (req, res) => {
  try {
    const { title, description, type, location, duration, applyLink } = req.body;
    if (!title || !description || !type || !location || !duration || !applyLink) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const job = new Job({
      postedBy: req.user._id,
      title,
      description,
      type,
      location,
      duration,
      applyLink,
    });

    await job.save();
    res.status(201).json({ message: 'Job posted', job });
  } catch (error) {
    console.error('Post job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'fullName company');
    res.json(jobs); // Returns array of jobs with poster's name and company
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { postJob, getJobs };