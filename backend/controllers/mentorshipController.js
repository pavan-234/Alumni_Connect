// const Mentorship = require('../models/Mentorship');

// const requestMentorship = async (req, res) => {
//   const { alumniId } = req.body;
//   const existingRequest = await Mentorship.findOne({ student: req.user._id, alumni: alumniId });
//   if (existingRequest) return res.status(400).json({ message: 'Request already sent' });
//   const request = new Mentorship({ student: req.user._id, alumni: alumniId });
//   await request.save();
//   res.status(201).json({ message: 'Mentorship request sent' });
// };

// const getMentorshipRequests = async (req, res) => {
//   const requests = await Mentorship.find({ alumni: req.user._id }).populate('student', 'fullName');
//   res.json(requests);
// };

// const updateMentorshipRequest = async (req, res) => {
//   const { requestId, status } = req.body;
//   const request = await Mentorship.findById(requestId);
//   if (!request || request.alumni.toString() !== req.user._id.toString()) {
//     return res.status(404).json({ message: 'Request not found' });
//   }
//   request.status = status;
//   await request.save();
//   res.json({ message: 'Request updated', request });
// };

// module.exports = { requestMentorship, getMentorshipRequests, updateMentorshipRequest };
// const Mentorship = require('../models/Mentorship');

// const requestMentorship = async (req, res) => {
//   try {
//     const { alumniId } = req.body;
//     if (!alumniId) {
//       return res.status(400).json({ message: 'Alumni ID is required' });
//     }

//     const existingRequest = await Mentorship.findOne({ student: req.user._id, alumni: alumniId });
//     if (existingRequest) {
//       return res.status(400).json({ message: 'Request already sent' });
//     }

//     const request = new Mentorship({ student: req.user._id, alumni: alumniId });
//     await request.save();
//     res.status(201).json({ message: 'Mentorship request sent' });
//   } catch (error) {
//     console.error('Request mentorship error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const getMentorshipRequests = async (req, res) => {
//   try {
//     const requests = await Mentorship.find({ alumni: req.user._id })
//       .populate('student', 'fullName email');  // You can add more student fields here if needed
//     res.json(requests);
//   } catch (error) {
//     console.error('Get mentorship requests error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const updateMentorshipRequest = async (req, res) => {
//   try {
//     const { requestId, status } = req.body;
//     if (!requestId || !status) {
//       return res.status(400).json({ message: 'Request ID and status are required' });
//     }

//     const request = await Mentorship.findById(requestId);
//     if (!request || request.alumni.toString() !== req.user._id.toString()) {
//       return res.status(404).json({ message: 'Request not found or unauthorized' });
//     }

//     request.status = status;
//     await request.save();
//     res.json({ message: 'Request updated', request });
//   } catch (error) {
//     console.error('Update mentorship request error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { requestMentorship, getMentorshipRequests, updateMentorshipRequest };


































const Mentorship = require('../models/Mentorship');

const requestMentorship = async (req, res) => {
  try {
    const { alumniId } = req.body;
    if (!alumniId) {
      return res.status(400).json({ message: 'Alumni ID is required' });
    }

    const existingRequest = await Mentorship.findOne({ student: req.user._id, alumni: alumniId });
    if (existingRequest) {
      return res.status(400).json({ message: 'Request already sent' });
    }

    const request = new Mentorship({ student: req.user._id, alumni: alumniId });
    await request.save();
    res.status(201).json({ message: 'Mentorship request sent' });
  } catch (error) {
    console.error('Request mentorship error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getMentorshipRequests = async (req, res) => {
  try {
    let requests;

    if (req.user.role === 'student') {
      requests = await Mentorship.find({ student: req.user._id })
        .populate('alumni', 'fullName email');
    } else if (req.user.role === 'alumni') {
      requests = await Mentorship.find({ alumni: req.user._id })
        .populate('student', 'fullName email');
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json(requests);
  } catch (error) {
    console.error('Get mentorship requests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const updateMentorshipRequest = async (req, res) => {
  try {
    if (req.user.role !== 'alumni') {
      return res.status(403).json({ message: 'Only alumni can update mentorship requests' });
    }

    const { requestId, status } = req.body;
    if (!requestId || !status) {
      return res.status(400).json({ message: 'Request ID and status are required' });
    }

    const request = await Mentorship.findById(requestId);
    console.log("Found request:", request);
    console.log("Logged-in alumni:", req.user._id);

    if (!request || request.alumni.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Request not found or unauthorized' });
    }

    request.status = status;
    await request.save();
    res.json({ message: 'Request updated', request });
  } catch (error) {
    console.error('Update mentorship request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { requestMentorship, getMentorshipRequests, updateMentorshipRequest };