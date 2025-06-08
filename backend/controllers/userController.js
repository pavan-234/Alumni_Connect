const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Signup
const signup = async (req, res) => {
  try {
    const { role, fullName, gender, passoutYear, email, password, collegeName, ...otherFields } = req.body;

    if (role === 'admin') return res.status(403).json({ message: 'Cannot sign up as admin' });
    if (!['student', 'alumni'].includes(role)) return res.status(400).json({ message: 'Invalid role' });

    if (!fullName || !gender || !passoutYear || !email || !password || !collegeName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const user = new User({ role, fullName, gender, passoutYear, email, password, collegeName, ...otherFields });
    await user.save();

    res.status(201).json({ message: 'Signup successful', userId: user._id });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { role, email, password } = req.body;
    if (!role || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await User.findOne({ email, role });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const userWithoutPassword = await User.findById(user._id).select('-password');

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isProfileUpdated =
      !!user.fullName &&
      !!user.gender &&
      !!user.passoutYear &&
      !!user.collegeName &&
      // !!user.profilePic &&
      (user.role !== 'alumni' || (!!user.experience && user.experience > 0));

    await user.save();
    res.json({ message: 'Profile updated', user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  signup,
  login,
  getProfile,
  updateProfile,
};
