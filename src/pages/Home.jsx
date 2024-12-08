import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const { user } = useAuth();
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const handleTherapistClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000); // Hide message after 3 seconds
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-primary-900 mb-6">
            Find Your Path to Mental Wellness
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with licensed therapists who understand your unique journey and can provide the support you need.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative">
            <Link
              to="/quiz"
              className="btn-primary text-lg px-8 py-3"
            >
              Take the Quiz
            </Link>
            {showLoginMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-50 to-accent-50 px-6 py-3 rounded-xl shadow-lg text-gray-700 border border-primary-100 whitespace-nowrap max-w-sm text-center"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🤗</span>
                  <p className="text-sm font-medium">
                    To ensure your privacy and provide personalized support, we invite you to log in first
                  </p>
                </div>
              </motion.div>
            )}
            <Link
              to={user ? "/therapists" : "#"}
              onClick={handleTherapistClick}
              className="btn-secondary text-lg px-8 py-3"
            >
              Browse Therapists
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card text-center">
              <div className="text-primary-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Matching</h3>
              <p className="text-gray-600">
                Take our quiz to find therapists who match your specific needs and preferences.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-primary-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
              <p className="text-gray-600">
                Book appointments with your chosen therapist at times that work for you.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-primary-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Sessions</h3>
              <p className="text-gray-600">
                Connect with your therapist through our secure platform, either online or in-person.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold text-primary-900 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Take our quick quiz to find the right therapist for you. It's free and takes less than 5 minutes.
            </p>
            <Link
              to="/quiz"
              className="btn-primary text-lg px-8 py-3"
            >
              Start Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
