import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { resourceImages } from '../assets/images/resource-images';
import { Button } from "@material-tailwind/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const resourceDetails = {
  anxiety: {
    title: 'Understanding and Managing Anxiety',
    description: 'A comprehensive guide to understanding anxiety, its causes, symptoms, and effective management strategies.',
    backgroundImage: resourceImages.anxiety,
    sections: [
      {
        title: 'What is Anxiety?',
        content: 'Anxiety is your body\'s natural response to stress. It\'s a feeling of fear or apprehension about what\'s to come. While it\'s normal to feel anxious at times, excessive anxiety can interfere with daily life.'
      },
      {
        title: 'Common Symptoms',
        content: [
          'Feeling nervous, restless, or tense',
          'Having a sense of impending danger, panic, or doom',
          'Increased heart rate',
          'Breathing rapidly (hyperventilation)',
          'Sweating',
          'Trembling',
          'Feeling weak or tired',
          'Trouble concentrating'
        ]
      },
      {
        title: 'Management Strategies',
        content: [
          'Practice relaxation techniques like deep breathing',
          'Maintain a regular exercise routine',
          'Get enough sleep',
          'Eat a balanced diet',
          'Limit caffeine and alcohol intake',
          'Practice mindfulness meditation',
          'Seek professional help when needed'
        ]
      }
    ]
  },
  depression: {
    title: 'Understanding Depression',
    description: 'Learn about depression, its impact on daily life, and various treatment approaches.',
    backgroundImage: resourceImages.depression,
    sections: [
      {
        title: 'What is Depression?',
        content: 'Depression is a mood disorder that causes a persistent feeling of sadness and loss of interest. It affects how you feel, think, and behave and can lead to various emotional and physical problems.'
      },
      {
        title: 'Common Signs',
        content: [
          'Persistent sad, anxious, or "empty" mood',
          'Loss of interest in activities once enjoyed',
          'Decreased energy or fatigue',
          'Difficulty sleeping or oversleeping',
          'Changes in appetite or weight',
          'Difficulty concentrating',
          'Feelings of hopelessness'
        ]
      },
      {
        title: 'Treatment Approaches',
        content: [
          'Psychotherapy (talk therapy)',
          'Medication when prescribed by a healthcare provider',
          'Lifestyle changes',
          'Regular exercise',
          'Social support',
          'Stress management techniques'
        ]
      }
    ]
  },
  'stress-management': {  
    title: 'Stress Management',
    description: 'Explore effective strategies for managing stress and maintaining mental well-being.',
    backgroundImage: resourceImages.stress,
    sections: [
      {
        title: 'Understanding Stress',
        content: 'Stress is your body\'s reaction to any change that requires an adjustment or response. While some stress can be positive, too much stress can have negative effects on your mental and physical health.'
      },
      {
        title: 'Common Stressors',
        content: [
          'Work or school pressures',
          'Financial concerns',
          'Relationship issues',
          'Major life changes',
          'Health concerns',
          'Environmental factors'
        ]
      },
      {
        title: 'Coping Strategies',
        content: [
          'Time management techniques',
          'Regular exercise',
          'Healthy eating habits',
          'Adequate sleep',
          'Relaxation techniques',
          'Setting boundaries',
          'Seeking social support'
        ]
      }
    ]
  }
};

const ResourceDetail = () => {
  const { topic } = useParams();
  const resource = resourceDetails[topic];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!resource) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Resource not found</h1>
        <p className="text-gray-600 mt-2">The requested resource topic could not be found.</p>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${resource.backgroundImage})`,
        backgroundColor: '#f8fafc'
      }}
    >
      <div className="absolute inset-0 z-0" 
           style={{
             backgroundImage: `url(${resource.backgroundImage})`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundAttachment: 'fixed',
             opacity: 0.3
           }}
      />
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 py-8"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <Link to="/resources">
                <Button 
                  variant="text" 
                  className="flex items-center gap-2 text-primary-600"
                  size="sm"
                >
                  <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Back to Resources
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-primary-600 mb-4">{resource.title}</h1>
              <p className="text-gray-600 text-xl">{resource.description}</p>
            </motion.div>

            <div className="space-y-8">
              {resource.sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-8 backdrop-blur-sm bg-opacity-90"
                >
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">{section.title}</h2>
                  {Array.isArray(section.content) ? (
                    <ul className="list-disc list-inside space-y-3 text-gray-600">
                      {section.content.map((item, i) => (
                        <li key={i} className="text-lg">{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 text-lg leading-relaxed">{section.content}</p>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center bg-white rounded-lg shadow-md p-8 backdrop-blur-sm bg-opacity-90"
            >
              <p className="text-gray-600 text-lg">
                If you need professional help, don't hesitate to{' '}
                <Link to="/therapists" className="text-primary-600 hover:text-primary-700 font-medium">
                  find a therapist
                </Link>
                .
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResourceDetail;
