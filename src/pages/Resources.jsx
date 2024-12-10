import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  List,
  ListItem,
  Input,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { resourceImages } from '../assets/images/resource-images';
import {
  ArrowRightIcon,
  LightBulbIcon,
  HeartIcon,
  SparklesIcon,
} from '../assets/icons';

const EducationalResource = ({ title, description, icon: Icon, topic }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-lg shadow-md p-6"
  >
    <div className="flex items-center mb-4">
      <Icon className="h-8 w-8 text-primary-600" />
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <Link
      to={`/resources/${topic}`}
      className="inline-flex items-center text-primary-600 hover:text-primary-700"
    >
      Learn More
      <ArrowRightIcon className="h-5 w-5 ml-2" />
    </Link>
  </motion.div>
);

const Resources = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const emergencyResources = [
    {
      title: 'National Crisis Hotline',
      description: '24/7 support for mental health emergencies',
      phone: '1-800-273-8255',
      image: resourceImages.emergency
    },
    {
      title: 'Crisis Text Line',
      description: 'Text HOME to 741741 to connect with a Crisis Counselor',
      phone: '741741',
      image: resourceImages.support
    },
  ];

  const educationalResources = [
    {
      title: 'Understanding Anxiety',
      description: 'Learn about anxiety disorders, their symptoms, and coping strategies.',
      icon: LightBulbIcon,
      topic: 'anxiety'
    },
    {
      title: 'Depression Awareness',
      description: 'Understand the signs of depression and available treatment options.',
      icon: HeartIcon,
      topic: 'depression'
    },
    {
      title: 'Stress Management',
      description: 'Discover effective techniques for managing stress in daily life.',
      icon: SparklesIcon,
      topic: 'stress-management'
    }
  ];

  const selfHelpResources = [
    {
      title: 'Mindfulness and Meditation',
      description: 'Practice mindfulness to reduce stress and anxiety',
      items: [
        'Headspace - Guided meditation app',
        'Calm - Sleep and meditation app',
        'Insight Timer - Free meditation app',
      ],
      image: resourceImages.meditation
    },
    {
      title: 'Self-Help Books',
      description: 'Recommended reading for mental health',
      items: [
        'The Body Keeps the Score by Bessel van der Kolk',
        'Feeling Good by David D. Burns',
        'The Anxiety and Phobia Workbook by Edmund Bourne',
      ],
      image: resourceImages.books
    },
    {
      title: 'Support Groups',
      description: 'Connect with others who understand',
      items: [
        '7 Cups - Online therapy and counseling',
        'NAMI Support Groups',
        'Depression and Bipolar Support Alliance',
      ],
      image: resourceImages.community
    },
  ];

  const wellnessTools = [
    {
      title: 'Mental Health Apps',
      description: 'Digital tools for mental wellness',
      items: [
        'Moodfit - Track and improve your mood',
        'Sanvello - Stress and anxiety management',
        'Talkspace - Online therapy platform',
      ],
      image: resourceImages.wellness
    },
    {
      title: 'Online Learning',
      description: 'Expand your knowledge',
      items: [
        'Coursera Mental Health Courses',
        'edX Psychology Classes',
        'Udemy Personal Development',
      ],
      image: resourceImages.education
    },
  ];

  const mentalHealthTips = [
    "Practice daily mindfulness meditation",
    "Maintain a regular sleep schedule",
    "Exercise regularly for mental well-being",
    "Stay connected with loved ones",
    "Set realistic goals and boundaries",
    "Take breaks from social media",
    "Practice gratitude daily",
    "Seek professional help when needed"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${resourceImages.hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center text-white z-10">
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-4"
          >
            Mental Health Resources
          </motion.h1>
          <motion.p
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl"
          >
            Your journey to mental wellness starts here
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Access Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
        >
          {['Emergency Help', 'Self-Help', 'Professional Support', 'Community'].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center cursor-pointer"
            >
              <Typography variant="h6" className="text-blue-gray-800">
                {item}
              </Typography>
            </motion.div>
          ))}
        </motion.div>

        {/* Emergency Resources Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mb-16"
        >
          <Typography variant="h3" color="blue" className="mb-8 text-center">
            Emergency Resources
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {emergencyResources.map((resource, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader
                    floated={false}
                    className="h-48 relative"
                  >
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                      {resource.title}
                    </Typography>
                    <Typography className="mb-4 text-gray-700">
                      {resource.description}
                    </Typography>
                    <Button
                      size="lg"
                      color="red"
                      ripple={true}
                      fullWidth={true}
                      className="flex items-center justify-center gap-2"
                    >
                      {resource.phone}
                    </Button>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Daily Mental Health Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16 bg-blue-50 rounded-xl p-8"
        >
          <Typography variant="h4" color="blue" className="mb-6 text-center">
            Daily Mental Health Tips
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {mentalHealthTips.map((tip, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow"
              >
                <Typography className="text-center text-gray-700">
                  {tip}
                </Typography>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Self-Help Resources Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mb-16"
        >
          <Typography variant="h3" color="blue" className="mb-8 text-center">
            Self-Help Resources
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {selfHelpResources.map((resource, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full">
                  <CardHeader
                    floated={false}
                    className="h-48 relative"
                  >
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                      {resource.title}
                    </Typography>
                    <Typography className="mb-4 text-gray-700">
                      {resource.description}
                    </Typography>
                    <List>
                      {resource.items.map((item, idx) => (
                        <ListItem key={idx} className="py-2">
                          {item}
                        </ListItem>
                      ))}
                    </List>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Educational Resources Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mb-16"
        >
          <Typography variant="h3" color="blue" className="mb-8 text-center">
            Educational Resources
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <EducationalResource
              title="Understanding Anxiety"
              description="Learn about anxiety symptoms and coping strategies"
              icon={LightBulbIcon}
              topic="anxiety"
            />
            <EducationalResource
              title="Depression Awareness"
              description="Understand depression and treatment options"
              icon={HeartIcon}
              topic="depression"
            />
            <EducationalResource
              title="Stress Management"
              description="Effective techniques for managing stress"
              icon={SparklesIcon}
              topic="stress-management"
            />
          </div>
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-blue-600 text-white rounded-xl p-8 mb-16"
        >
          <div className="text-center max-w-2xl mx-auto">
            <Typography variant="h4" className="mb-4">
              Stay Updated with Mental Health Resources
            </Typography>
            <Typography className="mb-6">
              Subscribe to our newsletter for the latest mental health tips, resources, and support.
            </Typography>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Input
                type="email"
                placeholder="Enter your email"
                className="!border-white text-white"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{
                  className: "min-w-[200px]",
                }}
              />
              <Button color="white" variant="outlined">
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-gray-600 mt-8"
        >
          <Typography className="font-medium">
            Remember: If you're experiencing a mental health emergency,
            <br />
            please call your local emergency services immediately.
          </Typography>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;
