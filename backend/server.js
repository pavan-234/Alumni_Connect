// const express = require('express');
// const cookieParser = require('cookie-parser');
// const connectDB = require('./config/db');
// const userRoutes = require('./routes/userRoutes');
// const jobRoutes = require('./routes/jobRoutes');
// const mentorshipRoutes = require('./routes/mentorshipRoutes');
// const messageRoutes = require('./routes/messageRoutes');
// const searchRoutes = require('./routes/searchRoutes');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// // Connect to DB
// connectDB();

// const cors = require('cors');

// // Add this **before** route definitions
// app.use(cors({
//   origin: 'http://localhost:5173', // or 'http://localhost:5173' if using Vite
//   credentials: true
// }));

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/mentorship', mentorshipRoutes);
// app.use('/api/messages', messageRoutes);
// app.use('/api/search', searchRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const mentorshipRoutes = require('./routes/mentorshipRoutes');
const messageRoutes = require('./routes/messageRoutes');
const searchRoutes = require('./routes/searchRoutes');

require('dotenv').config();

const app = express();

// Connect to MongoDB database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// CORS setup to allow requests from frontend (e.g. Vite dev server)
app.use(cors({
  origin: 'http://localhost:5173', // change as per your frontend URL
  credentials: true,
}));

// Mount API routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/mentorship', mentorshipRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/search', searchRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
