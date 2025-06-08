import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  LogIn,
  LogOut,
  Menu,
  X,
  Home,
  Shield,
  ChevronDown,
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('user_token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-blue-900 to-purple-900 shadow-lg'
          : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex-shrink-0">
            <div
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight group-hover:scale-105 transition-transform duration-300">
                Alumni Connect
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <NavLink icon={<Home className="h-4 w-4 mr-1" />} onClick={() => navigate('/')}>
              Home
            </NavLink>

            {!isAuthenticated ? (
              <>
                <NavLink
                  icon={<Users className="h-4 w-4 mr-1" />}
                  onClick={() => navigate('/register/student')}
                >
                  Register
                </NavLink>
                <NavLink icon={<LogIn className="h-4 w-4 mr-1" />} onClick={() => navigate('/login')}>
                  Login
                </NavLink>
              </>
            ) : (
              <>
                {role === 'admin' && (
                  <NavLink icon={<Shield className="h-4 w-4 mr-1" />} onClick={() => navigate('/admin')}>
                    Admin Panel
                  </NavLink>
                )}
                <NavLink icon={<LogOut className="h-4 w-4 mr-1" />} onClick={handleLogout}>
                  Logout
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-800 focus:outline-none transition-colors duration-300"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transform transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 invisible'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-br from-blue-900 to-purple-900 shadow-lg rounded-b-lg">
          <MobileNavLink icon={<Home className="h-5 w-5 mr-2" />} onClick={() => navigate('/')}>
            Home
          </MobileNavLink>

          {!isAuthenticated ? (
            <>
              <MobileNavLink
                icon={<Users className="h-5 w-5 mr-2" />}
                onClick={() => navigate('/register/student')}
              >
                Register
              </MobileNavLink>
              <MobileNavLink icon={<LogIn className="h-5 w-5 mr-2" />} onClick={() => navigate('/login')}>
                Login
              </MobileNavLink>
            </>
          ) : (
            <>
              {role === 'admin' && (
                <MobileNavLink icon={<Shield className="h-5 w-5 mr-2" />} onClick={() => navigate('/admin')}>
                  Admin Panel
                </MobileNavLink>
              )}
              <MobileNavLink icon={<LogOut className="h-5 w-5 mr-2" />} onClick={handleLogout}>
                Logout
              </MobileNavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ children, icon, onClick, withDropdown, isActive }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      isActive
        ? 'text-white bg-blue-700 bg-opacity-40'
        : 'text-blue-100 hover:text-white hover:bg-blue-700 hover:bg-opacity-30'
    }`}
  >
    {icon}
    {children}
    {withDropdown && (
      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
    )}
  </button>
);

const MobileNavLink = ({ children, icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center w-full text-left px-3 py-3 rounded-md text-base font-medium text-blue-100 hover:text-white hover:bg-blue-700 hover:bg-opacity-50 transition-colors duration-200"
  >
    {icon}
    {children}
  </button>
);

export default Navbar;
