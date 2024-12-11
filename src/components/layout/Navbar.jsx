import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { WelcomeModal } from '../WelcomeModal';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;
  const location = useLocation();

  useEffect(() => {
    // Show welcome modal when user logs in
    if (user && !localStorage.getItem('welcomeShown')) {
      setShowWelcome(true);
      localStorage.setItem('welcomeShown', 'true');
    }
  }, [user]);

  const publicLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  const privateLinks = [
    { name: 'Resources', path: '/resources' },
    { name: 'Find Therapists', path: '/therapists' },
    { name: 'Appointments', path: '/appointments' },
  ];

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
  
    return (
      <Link
        to={to}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
          ${isActive 
            ? 'text-[#BE8B69] bg-[#F7F7F7]' 
            : 'text-gray-600 hover:text-[#BE8B69] hover:bg-[#D2BAB0]'
          }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <>
      <WelcomeModal open={showWelcome} handleOpen={() => setShowWelcome(false)} />
      
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-[50px] w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {publicLinks.map((link) => (
                <NavLink key={link.name} to={link.path}>
                  {link.name}
                </NavLink>
              ))}
              {privateLinks.map((link) => (
                <NavLink key={link.name} to={link.path}>
                  {link.name}
                </NavLink>
              ))}
              {isAuthenticated ? (
                <>
                  <NavLink to="/profile">
                    Profile
                  </NavLink>
                  <button
                    onClick={logout}
                    className="btn-secondary px-4 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/signup">
                    Signup
                  </NavLink>
                  <Link
                    to="/login"
                    className="btn-primary px-4 py-2"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-[#BE8B69] focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden py-4"
            >
              {publicLinks.map((link) => (
                <NavLink key={link.name} to={link.path} onClick={() => setIsOpen(false)}>
                  {link.name}
                </NavLink>
              ))}
              {privateLinks.map((link) => (
                <NavLink key={link.name} to={link.path} onClick={() => setIsOpen(false)}>
                  {link.name}
                </NavLink>
              ))}
              {isAuthenticated ? (
                <>
                  <NavLink to="/profile" onClick={() => setIsOpen(false)}>
                    Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left py-2 text-gray-600 hover:text-[#BE8B69]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                    Signup
                  </NavLink>
                  <Link
                    to="/login"
                    className="block py-2 text-gray-600 hover:text-[#BE8B69]"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
