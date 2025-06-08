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