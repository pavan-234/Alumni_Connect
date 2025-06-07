

// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// const signup = async (req, res) => {
//   try {
//     const { role, fullName, gender, passoutYear, email, password, collegeName, ...otherFields } = req.body;
//     if (role === 'admin') return res.status(403).json({ message: 'Cannot sign up as admin' });
//     if (!['student', 'alumni'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
//     if (!fullName || !gender || !passoutYear || !email || !password || !collegeName) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'Email already exists' });
//     const user = new User({ role, fullName, gender, passoutYear, email, password, collegeName, ...otherFields });
//     await user.save();
//     res.status(201).json({ message: 'Signup successful, awaiting approval', userId: user._id });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { role, email, password } = req.body;

//     if (!role || !email || !password) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const user = await User.findOne({ email, role });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     const userWithoutPassword = await User.findById(user._id).select('-password');

//     res.json({
//       message: 'Login successful',
//       user: userWithoutPassword,
//       token,
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('-password');
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user);
//   } catch (error) {
//     console.error('Get profile error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const updateProfile = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     user.isProfileUpdated =
//       !!user.fullName &&
//       !!user.gender &&
//       !!user.passoutYear &&
//       !!user.collegeName &&
//       !!user.profilePic &&
//       (user.role !== 'alumni' || (!!user.experience && user.experience > 0));

//     await user.save();
//     res.json({ message: 'Profile updated', user });
//   } catch (error) {
//     console.error('Update profile error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const approveUser = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     if (user.role === 'admin') return res.status(400).json({ message: 'Cannot approve admin' });
//     if (!user.profilePic || (user.role === 'alumni' && !user.experience)) {
//       return res.status(400).json({ message: 'Required fields missing for approval' });
//     }
//     user.isApproved = true;
//     await user.save();
//     res.json({ message: 'User approved' });
//   } catch (error) {
//     console.error('Approve user error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     await User.findByIdAndDelete(userId);
//     res.json({ message: 'User deleted' });
//   } catch (error) {
//     console.error('Delete user error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const createAdmin = async (req, res) => {
//   try {
//     const { email, password, fullName, gender, passoutYear, collegeName } = req.body;
//     if (!email || !password || !fullName || !gender || !passoutYear || !collegeName) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'Email already exists' });
//     const admin = new User({
//       role: 'admin',
//       email,
//       password,
//       fullName,
//       gender,
//       passoutYear,
//       collegeName,
//       isApproved: true,
//     });
//     await admin.save();
//     res.status(201).json({ message: 'Admin created', adminId: admin._id });
//   } catch (error) {
//     console.error('Create admin error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const getAdminDashboard = async (req, res) => {
//   try {
//     const pendingUsers = await User.find({ isApproved: false }).select('-password');
//     res.json({
//       message: 'Pending user approval list',
//       pendingCount: pendingUsers.length,
//       pendingUsers,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to load admin dashboard' });
//   }
// };

// module.exports = {
//   signup,
//   login,
//   getProfile,
//   updateProfile,
//   approveUser,
//   deleteUser,
//   createAdmin,
//   getAdminDashboard,
// };
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
