import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import RegisterStudent from './pages/Register';
import RegisterAlumni from './pages/Register';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';

import StudentDashboard from './pages/student/StudentDashboard';
import StudentHome from './pages/student/StudentHome';
import StudentJobs from './pages/student/Jobs';
import StudentMentorship from './pages/student/Mentorship';
import StudentChat from './pages/student/StudentChat';
import StudentProfile from './pages/student/StudentProfile';
import SearchAlumni from './pages/student/SearchAlumni';
import StudentUpdateProfile from './pages/student/StudentUpdateProfile';

import AlumniDashboard from './pages/alumni/AlumniDashboard';
import AlumniHome from './pages/alumni/AlumniHome';
import PostJob from './pages/alumni/PostJob';
import SearchStudents from './pages/alumni/SearchStudents';
import MentorshipRequests from './pages/alumni/AlumniMentorshipRequests';
import AlumniChat from './pages/alumni/AlumniChat';
import AlumniProfile from './pages/alumni/AlumniProfile';
import UpdateProfileAlumni from './pages/alumni/UpdateProfileAlumni';

import './index.css';

function AppContent() {
  const location = useLocation();

  const isStudentDashboard = location.pathname.startsWith('/student-dashboard');
  const isAlumniDashboard = location.pathname.startsWith('/alumni-dashboard');
  const isAdminPanel = location.pathname.startsWith('/admin');
  const isRegisterOrLogin =
    location.pathname === '/login' ||
    location.pathname === '/register/student' ||
    location.pathname === '/register/alumni';

  const showNavbar = !isStudentDashboard && !isAlumniDashboard && !isAdminPanel && !isRegisterOrLogin;

  return (
    <>
      {showNavbar && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0 }}
        >
          <Routes location={location}>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/register/student" element={<RegisterStudent />} />
            <Route path="/register/alumni" element={<RegisterAlumni />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminPanel />} />

            {/* STUDENT DASHBOARD ROUTES */}
            <Route path="/student-dashboard" element={<StudentDashboard />}>
              <Route index element={<StudentHome />} />
              <Route path="jobs" element={<StudentJobs />} />
              <Route path="mentorship" element={<StudentMentorship />} />
              <Route path="chat" element={<StudentChat />} />
              <Route path="search-alumni" element={<SearchAlumni />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="updateprofile" element={<StudentUpdateProfile />} />
            </Route>

            {/* ALUMNI DASHBOARD ROUTES */}
            <Route path="/alumni-dashboard" element={<AlumniDashboard />}>
              <Route index element={<AlumniHome />} />
              <Route path="post-job" element={<PostJob />} />
              <Route path="search-students" element={<SearchStudents />} />
              <Route path="mentorship-requests" element={<MentorshipRequests />} />
              <Route path="chat" element={<AlumniChat />} />
              <Route path="profile" element={<AlumniProfile />} />
              <Route path="updateprofile" element={<UpdateProfileAlumni />} />
            </Route>
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;


























// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import { AnimatePresence, motion } from 'framer-motion';

// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// // REMOVE Old Login/Register imports
// // import RegisterStudent from './pages/Register'; // Assuming Register.jsx was a single file handling both
// // import RegisterAlumni from './pages/Register';
// // import Login from './pages/Login';
// // IMPORT the new AuthPage
// import AuthPage from './pages/AuthPage'; // Adjust path if needed

// import AdminPanel from './pages/AdminPanel';

// import StudentDashboard from './pages/student/StudentDashboard';
// import StudentHome from './pages/student/StudentHome';
// import StudentJobs from './pages/student/Jobs';
// import StudentMentorship from './pages/student/Mentorship';
// import StudentChat from './pages/student/StudentChat';
// import StudentProfile from './pages/student/StudentProfile';
// import SearchAlumni from './pages/student/SearchAlumni';
// import StudentUpdateProfile from './pages/student/StudentUpdateProfile';

// import AlumniDashboard from './pages/alumni/AlumniDashboard';
// import AlumniHome from './pages/alumni/AlumniHome';
// import PostJob from './pages/alumni/PostJob';
// import SearchStudents from './pages/alumni/SearchStudents';
// import MentorshipRequests from './pages/alumni/AlumniMentorshipRequests';
// import AlumniChat from './pages/alumni/AlumniChat';
// import AlumniProfile from './pages/alumni/AlumniProfile';
// import UpdateProfileAlumni from './pages/alumni/UpdateProfileAlumni';

// import './index.css'; // Ensure your global styles are imported

// function AppContent() {
//   const location = useLocation();

//   const isStudentDashboard = location.pathname.startsWith('/student-dashboard');
//   const isAlumniDashboard = location.pathname.startsWith('/alumni-dashboard');
//   const isAdminPanel = location.pathname.startsWith('/admin');

//   // Updated check for auth pages
//   const isAuthPage =
//     location.pathname === '/login' ||
//     location.pathname === '/register' || // General register route
//     location.pathname.startsWith('/register/'); // Specific register routes like /register/student

//   // Show Navbar on pages other than dashboards and the auth page
//   const showNavbar = !isStudentDashboard && !isAlumniDashboard && !isAdminPanel && !isAuthPage;

//   return (
//     <>
//       {showNavbar && <Navbar />}
//       {/* 
//         AnimatePresence and motion.div for page transitions.
//         Consider if this is desired for dashboard layouts too, or only for top-level pages.
//         If dashboards have their own internal Outlet animations, this might conflict or be redundant.
//         For simplicity, keeping it for all routes for now.
//       */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={location.pathname} // Use pathname for route changes, location.key for sub-route/state changes
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -15 }}
//           transition={{ duration: 0.4, ease: "easeInOut" }} // Adjusted transition
//         >
//           <Routes location={location}> {/* Pass location to Routes for AnimatePresence */}
//             {/* PUBLIC ROUTES */}
//             <Route path="/" element={<Home />} />

//             {/* AUTHENTICATION ROUTES using AuthPage */}
//             <Route path="/login" element={<AuthPage initialMode="login" key="login-page" />} />
//             {/* A general register route, could default to student or show role selection prominently */}
//             <Route path="/register" element={<AuthPage initialMode="register" key="register-page" />} />
//             {/* Specific register routes if needed for direct linking */}
//             <Route path="/register/student" element={<AuthPage initialMode="register" initialRole="student" key="register-student-page" />} />
//             <Route path="/register/alumni" element={<AuthPage initialMode="register" initialRole="alumni" key="register-alumni-page" />} />
            
//             {/* ADMIN ROUTE */}
//             <Route path="/admin" element={<AdminPanel />} /> {/* Ensure AdminPanel is protected */}

//             {/* STUDENT DASHBOARD ROUTES */}
//             <Route path="/student-dashboard" element={<StudentDashboard />}>
//               <Route index element={<StudentHome />} />
//               <Route path="jobs" element={<StudentJobs />} />
//               <Route path="mentorship" element={<StudentMentorship />} />
//               <Route path="chat" element={<StudentChat />} />
//               <Route path="search-alumni" element={<SearchAlumni />} />
//               <Route path="profile" element={<StudentProfile />} />
//               <Route path="updateprofile" element={<StudentUpdateProfile />} />
//             </Route>

//             {/* ALUMNI DASHBOARD ROUTES */}
//             <Route path="/alumni-dashboard" element={<AlumniDashboard />}>
//               <Route index element={<AlumniHome />} />
//               <Route path="post-job" element={<PostJob />} />
//               <Route path="search-students" element={<SearchStudents />} />
//               <Route path="mentorship-requests" element={<MentorshipRequests />} />
//               <Route path="chat" element={<AlumniChat />} />
//               <Route path="profile" element={<AlumniProfile />} />
//               <Route path="updateprofile" element={<UpdateProfileAlumni />} />
//             </Route>
            
//             {/* Optional: Add a 404 Not Found Route */}
//             {/* <Route path="*" element={<NotFoundPage />} /> */}
//           </Routes>
//         </motion.div>
//       </AnimatePresence>
//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;