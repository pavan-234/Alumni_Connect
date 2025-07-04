import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LogOut,
  Home,
  Search,
  UserCircle,
  MessageSquare,
  Briefcase,
  UserCheck,
  Pencil,
  Menu,
  X,
  GraduationCap, // Using GraduationCap for the dashboard brand icon
  ChevronDown,   // Kept for potential future use in NavLink, like in Navbar.jsx
} from 'lucide-react';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To determine active links
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Assuming this is your token key
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/login');
    setIsMobileMenuOpen(false); // Close menu on logout
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
  { label: 'Home', to: '/student-dashboard', icon: Home },
   { label: 'Jobs', to: '/student-dashboard/jobs', icon: Briefcase },
  
  { label: 'Search Alumni', to: '/student-dashboard/search-alumni', icon: Search },
  { label: 'Mentorship', to: '/student-dashboard/mentorship', icon: UserCheck },
 
  { label: 'Chat', to: '/student-dashboard/chat', icon: MessageSquare },

  { label: 'View Profile', to: '/student-dashboard/profile', icon: UserCircle },
  { label: 'Update Profile', to: '/student-dashboard/updateprofile', icon: Pencil },
];


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 text-white font-sans">
      {/* Navigation Bar - Styled like Navbar.jsx */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen // Keep bg if mobile menu is open even if not scrolled
            ? 'bg-gradient-to-r from-blue-900/95 to-purple-900/95 backdrop-blur-sm shadow-lg'
            : 'bg-transparent'
        }`}
        aria-label="Student dashboard navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex-shrink-0">
              <Link
                to="/student-dashboard"
                className="flex items-center space-x-2 cursor-pointer group"
                onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:scale-105 transition-transform duration-300">
                  Student Portal
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {navLinks.map((link) => (
                <DesktopNavLink
                  key={link.label}
                  to={link.to}
                  icon={<link.icon className="h-4 w-4 mr-1" />}
                  isActive={
                    location.pathname === link.to ||
                    (link.to !== '/student-dashboard' &&
                      location.pathname.startsWith(link.to))
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </DesktopNavLink>
              ))}
              {/* Logout as button */}
              <LogoutButton onClick={handleLogout} />
            </div>

            {/* Mobile Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-800/70 focus:outline-none transition-colors duration-300"
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
          className={`md:hidden transform transition-all duration-300 ease-in-out origin-top ${
            isMobileMenuOpen
              ? 'opacity-100 scale-y-100 max-h-screen'
              : 'opacity-0 scale-y-95 max-h-0 invisible'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-br from-blue-900/95 to-purple-900/95 shadow-lg rounded-b-lg">
            {navLinks.map((link) => (
              <MobileNavLink
                key={link.label}
                to={link.to}
                icon={<link.icon className="h-5 w-5 mr-2" />}
                onClick={() => setIsMobileMenuOpen(false)}
                isActive={
                  location.pathname === link.to ||
                  (link.to !== '/student-dashboard' &&
                    location.pathname.startsWith(link.to))
                }
              >
                {link.label}
              </MobileNavLink>
            ))}
            {/* Logout as button */}
            <MobileLogoutButton onClick={handleLogout} />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24">
        <Outlet />
      </main>
    </div>
  );
};

// DesktopNavLink component
const DesktopNavLink = ({ children, icon, to, onClick, isActive }) => (
  <Link
    to={to || '#'}
    onClick={onClick}
    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      isActive
        ? 'text-white bg-blue-700 bg-opacity-40'
        : 'text-blue-100 hover:text-white hover:bg-blue-700 hover:bg-opacity-30'
    }`}
  >
    {icon}
    {children}
  </Link>
);

// MobileNavLink component
const MobileNavLink = ({ children, icon, to, onClick, isActive }) => (
  <Link
    to={to || '#'}
    onClick={onClick}
    className={`flex items-center w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
      isActive
        ? 'text-white bg-blue-600 bg-opacity-60'
        : 'text-blue-100 hover:text-white hover:bg-blue-700 hover:bg-opacity-50'
    }`}
  >
    {icon}
    {children}
  </Link>
);

// Desktop Logout Button (styled like nav links but a button)
const LogoutButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 text-blue-100 hover:text-white hover:bg-blue-700 hover:bg-opacity-30"
    type="button"
  >
    <LogOut className="h-4 w-4 mr-1" />
    Logout
  </button>
);

// Mobile Logout Button (styled like mobile nav links but a button)
const MobileLogoutButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 text-blue-100 hover:text-white hover:bg-blue-700 hover:bg-opacity-50"
    type="button"
  >
    <LogOut className="h-5 w-5 mr-2" />
    Logout
  </button>
);

export default StudentDashboard;
