import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import { ChatbotModal } from '../components/ChatbotModal';

const Home = () => {
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const slideIn = {
    hidden: { x: -100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        duration: 1,
        bounce: 0.3
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Animation for the title text
  const titleText = "Find Your Path to Mental Wellness";
  const words = titleText.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.25,  
        delayChildren: 0.1 * i, 
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 20,     
        stiffness: 50,   
        duration: 0.8,   
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 50,
        duration: 0.8,
      },
    },
  };

  const handleTherapistClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white relative">
      {/* Chatbot Button and Modal */}
      <ChatbotModal 
        open={showChatbot} 
        handleOpen={() => setShowChatbot(false)} 
      />
      
      <motion.div 
        className="fixed bottom-8 right-8 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button 
          onClick={() => setShowChatbot(!showChatbot)}
          className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
          aria-label="Open chat"
        >
          <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
        </button>
      </motion.div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-primary-900 mb-6 flex flex-wrap justify-center gap-x-3"
          >
            {words.map((word, index) => (
              <motion.span
                variants={child}
                key={index}
                className="inline-block"
                style={{ 
                  display: 'inline-block',
                  marginBottom: '0.5rem' // Add space below words for wrapping
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            variants={letterAnimation}
          >
            Connect with licensed therapists who understand your unique journey and can provide the support you need.
          </motion.p>
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

      {/* Featured Therapists Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-4xl font-bold text-primary-900 mb-4">
            Meet Our Expert Therapists
          </h2>
          <p className="text-xl text-gray-600">
            Connect with licensed professionals who understand your unique journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Dr. Sarah Johnson",
              title: "Clinical Psychologist",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
              specialties: ["Anxiety", "Depression"],
              rating: 4.9,
              reviews: 127
            },
            {
              name: "Dr. Michael Chen",
              title: "Psychiatrist",
              image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
              specialties: ["Stress Management", "Work-Life Balance"],
              rating: 4.8,
              reviews: 93
            },
            {
              name: "Emma Williams",
              title: "Licensed Counselor",
              image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
              specialties: ["Relationships", "Self-Growth"],
              rating: 4.9,
              reviews: 156
            }
          ].map((therapist, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <img
                src={therapist.image}
                alt={therapist.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  {therapist.name}
                </h3>
                <p className="text-gray-600 mb-4">{therapist.title}</p>
                
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {"★".repeat(Math.floor(therapist.rating))}
                  </div>
                  <span className="ml-2 text-gray-600">
                    {therapist.rating} ({therapist.reviews} reviews)
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {therapist.specialties.map((specialty, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => navigate(`/therapist/${index + 1}`)}
                  className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/therapists')}
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            View All Therapists
            <span className="ml-2">→</span>
          </motion.button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={slideIn} className="card text-center">
              <div className="text-primary-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Matching</h3>
              <p className="text-gray-600">
                Take our quiz to find therapists who match your specific needs and preferences.
              </p>
            </motion.div>

            <motion.div variants={slideIn} className="card text-center">
              <div className="text-primary-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
              <p className="text-gray-600">
                Book appointments with your chosen therapist at times that work best for you.
              </p>
            </motion.div>

            <motion.div variants={slideIn} className="card text-center">
              <div className="text-primary-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Resource Library</h3>
              <p className="text-gray-600">
                Access our comprehensive library of mental health resources and guides.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Resources Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Mental Health Resources
            </h2>
            <p className="text-xl text-gray-600">
              Explore our curated collection of mental health resources
            </p>
          </motion.div>

          <motion.div
            variants={containerAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    Anxiety Management
                  </Typography>
                  <Typography>
                    Learn effective techniques to manage anxiety and stress in daily life.
                  </Typography>
                  <Link to="/resources/anxiety" className="mt-4 inline-block text-primary-600 hover:text-primary-700">
                    Learn More →
                  </Link>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    Depression Support
                  </Typography>
                  <Typography>
                    Discover strategies and resources for coping with depression.
                  </Typography>
                  <Link to="/resources/depression" className="mt-4 inline-block text-primary-600 hover:text-primary-700">
                    Learn More →
                  </Link>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    Stress Management
                  </Typography>
                  <Typography>
                    Find practical ways to handle stress and improve your well-being.
                  </Typography>
                  <Link to="/resources/stress-management" className="mt-4 inline-block text-primary-600 hover:text-primary-700">
                    Learn More →
                  </Link>
                </CardBody>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from people who found support through MindWell
            </p>
          </motion.div>

          <motion.div
            variants={containerAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                "MindWell helped me find the perfect therapist who truly understands my needs. The matching process was seamless."
              </p>
              <p className="font-semibold text-primary-900">- Sarah M.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                "The resources available here have been invaluable in my journey to better mental health."
              </p>
              <p className="font-semibold text-primary-900">- James R.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                "I appreciate how easy it is to schedule sessions and access mental health resources all in one place."
              </p>
              <p className="font-semibold text-primary-900">- Emily K.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Take the first step towards better mental health today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/quiz"
                className="btn-primary text-lg px-8 py-3"
              >
                Take the Quiz
              </Link>
              <Link
                to="/resources"
                className="btn-secondary text-lg px-8 py-3"
              >
                Explore Resources
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
