const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['student', 'alumni', 'admin'], required: true },
  fullName: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  passoutYear: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  github: { type: String },
  linkedIn: { type: String },
  // profilePic: { type: String },
  collegeName: { type: String, required: true },
  company: { type: String, required: function () { return this.role === 'alumni'; } },
  domains: { type: [String], required: function () { return this.role === 'alumni'; } },
  experience: { type: Number },
  isApproved: { type: Boolean, default: true },
});

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      console.log('Hashing password for:', this.email);
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (error) {
    console.error('Error in pre-save hook:', error);
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Error comparing password:', error);
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema);