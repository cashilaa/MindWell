import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDaysIcon, VideoCameraIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

const TherapistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample therapist data - In production, this would come from your API
  const therapist = {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Clinical Psychologist",
    specializations: ["Anxiety", "Depression", "LGBTQ+ Support", "Relationship Issues"],
    formats: ["In-person", "Online"],
    languages: ["English", "Spanish"],
    priceRange: "Sliding Scale ($80-150)",
    availability: ["Weekends", "Evenings"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviews: 127,
    location: "New York, NY",
    nextAvailable: "Tomorrow",
    education: [
      "Ph.D. in Clinical Psychology, Stanford University",
      "M.A. in Psychology, Columbia University",
      "B.A. in Psychology, NYU"
    ],
    about: "With over 15 years of experience, I specialize in helping individuals navigate anxiety, depression, and life transitions. My approach combines cognitive-behavioral therapy with mindfulness techniques, creating a safe and supportive environment for growth and healing.",
    approach: "I believe in creating a collaborative therapeutic relationship where we work together to understand your unique experiences and develop practical strategies for positive change. My approach is integrative, drawing from various evidence-based methods to best suit your individual needs.",
    insurance: ["Blue Cross", "Aetna", "United Healthcare"],
    sessionTypes: [
      {
        type: "Initial Consultation",
        duration: "50 minutes",
        price: "Free"
      },
      {
        type: "Individual Therapy",
        duration: "50 minutes",
        price: "$120"
      },
      {
        type: "Couples Therapy",
        duration: "80 minutes",
        price: "$160"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-primary-600 hover:text-primary-700 flex items-center gap-2"
        >
          ← Back to Therapists
        </button>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full md:w-48 object-cover"
                  src={therapist.image}
                  alt={therapist.name}
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-primary-900 mb-2">
                      {therapist.name}
                    </h1>
                    <p className="text-xl text-gray-600 mb-4">{therapist.title}</p>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span>📍 {therapist.location}</span>
                      <span>⭐ {therapist.rating} ({therapist.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <motion.button
              whileHover={{ y: -2 }}
              className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <CalendarDaysIcon className="h-6 w-6 text-primary-600" />
              <span>Schedule Session</span>
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <VideoCameraIcon className="h-6 w-6 text-primary-600" />
              <span>Video Consultation</span>
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <ChatBubbleLeftIcon className="h-6 w-6 text-primary-600" />
              <span>Send Message</span>
            </motion.button>
          </div>

          {/* Main Info Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-primary-900 mb-4">About</h2>
                <p className="text-gray-600">{therapist.about}</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-primary-900 mb-4">Approach</h2>
                <p className="text-gray-600">{therapist.approach}</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-primary-900 mb-4">Education</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {therapist.education.map((edu, index) => (
                    <li key={index}>{edu}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-primary-900 mb-4">Session Types</h2>
                {therapist.sessionTypes.map((session, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <h3 className="font-medium text-gray-900">{session.type}</h3>
                    <p className="text-gray-600">{session.duration}</p>
                    <p className="text-primary-600 font-medium">{session.price}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-primary-900 mb-4">Insurance</h2>
                <ul className="space-y-2">
                  {therapist.insurance.map((ins, index) => (
                    <li key={index} className="text-gray-600">• {ins}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-primary-900 mb-4">Specializations</h2>
                <div className="flex flex-wrap gap-2">
                  {therapist.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TherapistDetail;
