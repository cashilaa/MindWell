import { motion } from 'framer-motion';
import { useState } from 'react';

const blogPosts = [
    {
      title: "Understanding Anxiety and Panic Attacks",
      excerpt: "Learn about different types of anxiety, recognizing panic attacks, and effective coping strategies for managing symptoms in daily life...",
      category: "Anxiety",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "The Connection Between Sleep and Mental Health",
      excerpt: "Explore how sleep affects your mental wellbeing and discover practical tips for improving your sleep quality...",
      category: "Wellness",
      date: "March 13, 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Digital Detox: Managing Screen Time for Mental Health",
      excerpt: "How excessive screen time affects mental health and practical strategies for maintaining a healthy digital balance...",
      category: "Modern Life",
      date: "March 12, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Mindful Eating and Mental Wellness",
      excerpt: "Understanding the relationship between food, mood, and mental health. Learn practices for mindful eating...",
      category: "Nutrition",
      date: "March 11, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1511909525232-61113c912358?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Building Resilience Through Difficult Times",
      excerpt: "Develop strategies for bouncing back from setbacks and building emotional resilience...",
      category: "Personal Growth",
      date: "March 10, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Supporting Loved Ones with Depression",
      excerpt: "Learn how to provide effective support to friends and family members dealing with depression...",
      category: "Depression",
      date: "March 5, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1517677129300-07b130802f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Workplace Mental Health: Setting Boundaries",
      excerpt: "Essential strategies for maintaining mental health at work, including setting healthy boundaries and managing stress...",
      category: "Work Life",
      date: "March 3, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "The Power of Creative Expression in Therapy",
      excerpt: "Exploring art, music, and writing as therapeutic tools for mental health and emotional expression...",
      category: "Therapy",
      date: "March 1, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1499892477393-f675706cbe6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Understanding and Managing Social Anxiety",
      excerpt: "Practical strategies for coping with social anxiety and building confidence in social situations...",
      category: "Anxiety",
      date: "February 28, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Mindfulness for Beginners: Getting Started",
      excerpt: "A comprehensive guide to starting your mindfulness journey with simple, practical exercises...",
      category: "Mindfulness",
      date: "February 25, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "PTSD: Understanding Trauma and Recovery",
      excerpt: "A comprehensive guide to understanding Post-Traumatic Stress Disorder, its symptoms, and effective treatment approaches...",
      category: "Trauma",
      date: "February 22, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "The Role of Exercise in Mental Health",
      excerpt: "Discover how physical activity can improve mood, reduce anxiety, and boost overall mental well-being...",
      category: "Wellness",
      date: "February 20, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Navigating Grief and Loss",
      excerpt: "Understanding the stages of grief and finding healthy ways to cope with loss and bereavement...",
      category: "Grief",
      date: "February 18, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Seasonal Affective Disorder (SAD): Coping Strategies",
      excerpt: "Learn about SAD, its impact on mental health, and effective ways to manage seasonal depression...",
      category: "Depression",
      date: "February 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1517783999520-f068d7431a60?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Parenting and Mental Health",
      excerpt: "Balancing parental responsibilities while maintaining good mental health and supporting children's emotional well-being...",
      category: "Family",
      date: "February 12, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Technology Addiction: Signs and Solutions",
      excerpt: "Identifying signs of technology addiction and strategies for developing a healthier relationship with digital devices...",
      category: "Modern Life",
      date: "February 10, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Self-Compassion: Being Kind to Yourself",
      excerpt: "Learning to practice self-compassion and overcome negative self-talk for better mental health...",
      category: "Personal Growth",
      date: "February 8, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Managing Panic Attacks: A Practical Guide",
      excerpt: "Step-by-step strategies for managing and preventing panic attacks in daily life...",
      category: "Anxiety",
      date: "February 5, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1474666476036-7c9e3b5beaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "The Impact of Social Media on Mental Health",
      excerpt: "Understanding how social media affects our mental well-being and tips for healthier online habits...",
      category: "Modern Life",
      date: "February 3, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Couples Therapy: Strengthening Relationships",
      excerpt: "Benefits of couples therapy and how it can improve communication and strengthen relationships...",
      category: "Relationships",
      date: "February 1, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

// Add a category filter at the top
const categories = [
  "All",
  "Anxiety",
  "Depression",
  "Wellness",
  "Modern Life",
  "Work Life",
  "Mindfulness",
  "Therapy",
  "Personal Growth",
  "Nutrition",
  "Trauma",
  "Grief",
  "Family",
  "Relationships"
];

const MentalHealthBlog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    },
    hover: {
      y: -10,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  };

  // Add this before the return statement
  const renderFilters = () => (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
    </div>
  );

  // Update the return statement to include filters
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
            Mental Health Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our latest articles on mental wellness, self-care, and personal growth
          </p>
        </motion.div>

        {renderFilters()}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2"
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 text-primary-700 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-3 text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center group"
                  >
                    Read More
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
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-600 text-lg">
                No articles found matching your criteria.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MentalHealthBlog; 