// import React, { useState } from 'react';
// import { Link, Outlet, useNavigate } from 'react-router-dom';

// const AlumniDashboard = () => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/login');
//   };

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* Top Navigation */}
//       <nav className="bg-gray-800 shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Brand/Title */}
//             <div className="flex-shrink-0">
//               <Link to="/alumni-dashboard" className="text-2xl font-bold text-white">
//                 Alumni Dashboard
//               </Link>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex md:items-center md:space-x-6">
//               <Link
//                 to="/alumni-dashboard"
//                 className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/alumni-dashboard/post-job"
//                 className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
//               >
//                 Post Job
//               </Link>
//               <Link
//                 to="/alumni-dashboard/search-students"
//                 className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
//               >
//                 Search Students
//               </Link>
//               <Link
//                 to="/alumni-dashboard/mentorship-requests"
//                 className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
//               >
//                 Mentorship Requests
//               </Link>
//               <Link
//                 to="/alumni-dashboard/chat"
//                 className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
//               >
//                 Chat with Mentees
//               </Link>
//               <Link
//                 to="/alumni-dashboard/profile"
//                 className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
//               >
//                 View Profile
//               </Link>
//               <Link
//                 to="/alumni-dashboard/updateprofile"
//                 className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
//               >
//                 Update Profile
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
//               >
//                 Logout
//               </button>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="md:hidden">
//               <button
//                 onClick={toggleMenu}
//                 className="text-gray-300 hover:text-white focus:outline-none"
//                 aria-label="Toggle menu"
//                 aria-expanded={isOpen}
//               >
//                 <svg
//                   className="h-6 w-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//               <Link
//                 to="/alumni-dashboard"
//                 className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
//                 onClick={toggleMenu}
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/alumni-dashboard/post-job"
//                 className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
//                 onClick={toggleMenu}
//               >
//                 Post Job
//               </Link>
//               <Link
//                 to="/alumni-dashboard/search-students"
//                 className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
//                 onClick={toggleMenu}
//               >
//                 Search Students
//               </Link>
//               <Link
//                 to="/alumni-dashboard/mentorship-requests"
//                 className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
//                 onClick={toggleMenu}
//               >
//                 Mentorship Requests
//               </Link>
//               <Link
//                 to="/alumni-dashboard/chat"
//                 className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
//                 onClick={toggleMenu}
//               >
//                 Chat with Mentees
//               </Link>
//               <Link
//                 to="/alumni-dashboard/profile"
//                 className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
//                 onClick={toggleMenu}
//               >
//                 View Profile
//               </Link>
//               <Link
//                 to="/alumni-dashboard/updateprofile"
//                 className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
//                 onClick={toggleMenu}
//               >
//                 Update Profile
//               </Link>
//               <button
//                 onClick={() => {
//                   handleLogout();
//                   toggleMenu();
//                 }}
//                 className="w-full text-left bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Content Area */}
//       <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AlumniDashboard;















import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LogOut,
  Home,
  Search,
  UserCircle,
  MessageSquare,
  Briefcase,    // For Post Job
  Users as UsersIcon, // For Search Students, and Alumni Portal icon
  UserCheck,    // For Mentorship Requests
  Pencil,
  Menu,
  X,
  // GraduationCap, // Not typically for Alumni Portal
  ChevronDown,
  Edit, // Could be used for Update Profile if Pencil is too generic
  Handshake, // Alternative for Mentorship
  MessageCircleMore, // For Chat with Mentees
} from 'lucide-react';

// --- Reusable NavLink and LogoutButton Components ---
// IMPORTANT: These should ideally be in a shared components file and imported.
// For this example, I'm including them directly.

const DesktopNavLink = ({ children, icon, to, onClick, isActive }) => (
  <Link
    to={to || '#'}
    onClick={onClick}
    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      isActive
        ? 'text-white bg-blue-700 bg-opacity-40' // Style from your StudentDashboard
        : 'text-blue-100 hover:text-white hover:bg-blue-700 hover:bg-opacity-30'
    }`}
    aria-current={isActive ? 'page' : undefined}
  >
    {icon}
    {children}
  </Link>
);

const MobileNavLink = ({ children, icon, to, onClick, isActive }) => (
  <Link
    to={to || '#'}
    onClick={onClick}
    className={`flex items-center w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
      isActive
        ? 'text-white bg-blue-600 bg-opacity-60' // Style from your StudentDashboard
        : 'text-blue-100 hover:text-white hover:bg-blue-700 hover:bg-opacity-50'
    }`}
    aria-current={isActive ? 'page' : undefined}
  >
    {icon}
    {children}
  </Link>
);

// Using 'LogoutButton' as the base name, not 'DesktopLogoutButton' as in your StudentDashboard
const LogoutButton = ({ onClick }) => ( 
  <button
    onClick={onClick}
    className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 text-blue-100 hover:text-white hover:bg-blue-700 hover:bg-opacity-30" // Matched style
    type="button"
  >
    <LogOut className="h-4 w-4 mr-1" />
    Logout
  </button>
);

const MobileLogoutButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 text-blue-100 hover:text-white hover:bg-blue-700 hover:bg-opacity-50" // Matched style
    type="button"
  >
    <LogOut className="h-5 w-5 mr-2" />
    Logout
  </button>
);
// --- End Reusable Components ---


const AlumniDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // Using localStorage.clear() as in your original AlumniDashboard.
    // Consider more targeted removal if other localStorage items should persist.
    localStorage.clear(); 
    // Or, more specifically:
    // localStorage.removeItem('alumni_token'); // Or 'user_token' if standardized
    // localStorage.removeItem('userId');
    // localStorage.removeItem('role');
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Navigation links specific to Alumni Dashboard
  const navLinks = [
    { label: 'Home', to: '/alumni-dashboard', icon: Home },
    { label: 'Post Job', to: '/alumni-dashboard/post-job', icon: Briefcase },
    { label: 'Search Students', to: '/alumni-dashboard/search-students', icon: Search }, // Changed icon
    { label: 'Mentorship Desk', to: '/alumni-dashboard/mentorship-requests', icon: Handshake },
    { label: 'Chat', to: '/alumni-dashboard/chat', icon: MessageCircleMore }, // Differentiated icon
    { label: 'My Profile', to: '/alumni-dashboard/profile', icon: UserCircle },
    { label: 'Update Profile', to: '/alumni-dashboard/updateprofile', icon: Pencil },
  ];

  return (
    // Applied StudentDashboard's overall page styling
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 text-white font-sans">
      {/* Navigation Bar - Styled like StudentDashboard's Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-gradient-to-r from-blue-900/95 to-purple-900/95 backdrop-blur-sm shadow-lg' // Copied style
            : 'bg-transparent'
        }`}
        aria-label="Alumni dashboard navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Consistent max-width */}
          <div className="flex items-center justify-between h-16"> {/* Consistent height */}
            {/* Brand */}
            <div className="flex-shrink-0">
              <Link
                to="/alumni-dashboard"
                className="flex items-center space-x-2 cursor-pointer group" // Copied style
                onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300"> {/* Different gradient for Alumni */}
                  <UsersIcon className="h-5 w-5 text-white" /> {/* Different icon for Alumni */}
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:scale-105 transition-transform duration-300">
                  Alumni Portal
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center md:space-x-1"> {/* Consistent spacing */}
              {navLinks.map((link) => (
                <DesktopNavLink
                  key={link.label}
                  to={link.to}
                  icon={<link.icon className="h-4 w-4 mr-1" />}
                  isActive={
                    location.pathname === link.to ||
                    (link.to !== '/alumni-dashboard' && // Ensure base path is correct
                      location.pathname.startsWith(link.to))
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </DesktopNavLink>
              ))}
              <LogoutButton onClick={handleLogout} /> {/* Use LogoutButton */}
            </div>

            {/* Mobile Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-800/70 focus:outline-none transition-colors duration-300" // Copied style
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transform transition-all duration-300 ease-in-out origin-top ${ // Copied style
            isMobileMenuOpen
              ? 'opacity-100 scale-y-100 max-h-screen'
              : 'opacity-0 scale-y-95 max-h-0 invisible'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-br from-blue-900/95 to-purple-900/95 shadow-lg rounded-b-lg"> {/* Copied style */}
            {navLinks.map((link) => (
              <MobileNavLink
                key={link.label}
                to={link.to}
                icon={<link.icon className="h-5 w-5 mr-2" />}
                onClick={() => setIsMobileMenuOpen(false)}
                isActive={
                  location.pathname === link.to ||
                  (link.to !== '/alumni-dashboard' &&
                    location.pathname.startsWith(link.to))
                }
              >
                {link.label}
              </MobileNavLink>
            ))}
            <MobileLogoutButton onClick={handleLogout} /> {/* Use MobileLogoutButton */}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      {/* Applied StudentDashboard's main content area styling */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24"> 
        <Outlet />
      </main>
    </div>
  );
};

export default AlumniDashboard;