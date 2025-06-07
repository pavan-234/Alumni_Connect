const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['internship', 'job', 'partTime', 'fullTime'], required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  applyLink: { type: String, required: true },
});

module.exports = mongoose.model('Job', jobSchema);
