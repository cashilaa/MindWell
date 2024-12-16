import { motion } from 'framer-motion';

const SelfHelpTools = () => {
  const tools = [
    {
      title: "Meditation Guide",
      description: "Simple meditation techniques for daily practice",
      icon: "🧘‍♀️",
      category: "Mindfulness",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Stress Management",
      description: "Practical tools for managing stress and anxiety",
      icon: "🌱",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Sleep Hygiene",
      description: "Tips and techniques for better sleep quality",
      icon: "😴",
      category: "Health",
      image: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Mood Journal",
      description: "Track and understand your emotions",
      icon: "📔",
      category: "Self-Reflection",
      image: "https://images.unsplash.com/photo-1517677129300-07b130802f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Breathing Exercises",
      description: "Simple breathing techniques for anxiety relief",
      icon: "🫁",
      category: "Anxiety Relief",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Positive Affirmations",
      description: "Daily affirmations for mental strength",
      icon: "✨",
      category: "Motivation",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Self-Help Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover practical resources and techniques to support your mental well-being
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={tool.image}
                  alt={tool.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className="text-2xl">{tool.icon}</span>
                  <span className="px-3 py-1 bg-white/90 text-primary-700 rounded-full text-sm font-medium">
                    {tool.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {tool.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {tool.description}
                </p>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center group"
                >
                  Explore Tool
                  <svg 
                    className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SelfHelpTools; 