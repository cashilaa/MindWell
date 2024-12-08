import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const publicLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const privateLinks = [
    { name: 'Find Therapists', path: '/therapists' },
    { name: 'Appointments', path: '/appointments' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              MindWell
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Public Links */}
            {publicLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* Private Links - Only show when logged in */}
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
                <>
                  <span className="text-gray-600">Welcome, {user.name}</span>
                  <button
                    onClick={logout}
                    className="btn-secondary px-4 py-2"
                  >
                    Logout
                  </button>
                </>
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
              <>
                <span className="block py-2 text-gray-600">Welcome, {user.name}</span>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-600 hover:text-primary-600"
                >
                  Logout
                </button>
              </>
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
  );
};

export default Navbar;
