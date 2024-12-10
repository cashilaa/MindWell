import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { WelcomeModal } from '../WelcomeModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    // Show welcome modal when user logs in
    if (user && !localStorage.getItem('welcomeShown')) {
      setShowWelcome(true);
      localStorage.setItem('welcomeShown', 'true');
    }
  }, [user]);

  const publicLinks = [
    { name: 'Home', path: '/' },
  ];

  const privateLinks = [
    { name: 'About', path: '/about' },
    { name: 'Resources', path: '/resources' },
    { name: 'Find Therapists', path: '/therapists' },
    { name: 'Appointments', path: '/appointments' },
  ];

  return (
    <>
      <WelcomeModal open={showWelcome} handleOpen={() => setShowWelcome(false)} />
      
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary-600">
                MindWell
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {publicLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              {user && (
                <>
                  {privateLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </>
              )}

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                {user ? (
                  <button
                    onClick={logout}
                    className="btn-secondary px-4 py-2"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="text-gray-600 hover:text-primary-600">
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="btn-primary px-4 py-2"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-primary-600 focus:outline-none"
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
                <Link
                  key={link.name}
                  to={link.path}
                  className="block py-2 text-gray-600 hover:text-primary-600"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {user && (
                <>
                  {privateLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="block py-2 text-gray-600 hover:text-primary-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </>
              )}

              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-600 hover:text-primary-600"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-2 text-gray-600 hover:text-primary-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block py-2 text-gray-600 hover:text-primary-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
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
