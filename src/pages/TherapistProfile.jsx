import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import BookingModal from '../components/BookingModal';

const TherapistProfile = () => {
  const { id } = useParams();

  // Mock data - in a real app, this would come from an API
  const therapistData = {
    1: {
      name: "Dr. Sarah Johnson",
      title: "Clinical Psychologist",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      specialties: ["Anxiety", "Depression", "Trauma", "Stress Management"],
      education: "Ph.D. in Clinical Psychology, Stanford University",
      experience: "15+ years",
      approach: "I believe in creating a safe, supportive environment where clients can explore their challenges and develop practical strategies for growth. My approach combines cognitive-behavioral therapy with mindfulness techniques.",
      rating: 4.9,
      reviews: 127,
      languages: ["English", "Spanish"],
      availability: "Monday-Friday, Evening sessions available",
      insurance: ["Blue Cross", "Aetna", "United Healthcare"],
      sessionTypes: ["Individual", "Couples", "Group"],
      rate: "$150-200 per session"
    },
    2: {
      name: "Dr. Michael Chen",
      title: "Psychiatrist",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      specialties: ["Stress Management", "Work-Life Balance", "Anxiety", "Depression"],
      education: "M.D., Harvard Medical School",
      experience: "12+ years",
      approach: "I take a holistic approach to mental health, considering both psychological and physiological factors. My practice combines evidence-based treatments with personalized care strategies.",
      rating: 4.8,
      reviews: 93,
      languages: ["English", "Mandarin"],
      availability: "Tuesday-Saturday, Morning and afternoon sessions",
      insurance: ["Blue Cross", "Cigna", "Medicare"],
      sessionTypes: ["Individual", "Medication Management"],
      rate: "$200-250 per session"
    },
    3: {
      name: "Emma Williams",
      title: "Licensed Counselor",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      specialties: ["Relationships", "Self-Growth", "Family Therapy", "Career Counseling"],
      education: "M.A. in Counseling Psychology, Columbia University",
      experience: "8+ years",
      approach: "My therapeutic style is warm, collaborative, and solution-focused. I help clients identify their strengths and develop practical tools for navigating life's challenges.",
      rating: 4.9,
      reviews: 156,
      languages: ["English"],
      availability: "Monday-Thursday, Flexible hours",
      insurance: ["Aetna", "United Healthcare", "Out-of-network"],
      sessionTypes: ["Individual", "Couples", "Family"],
      rate: "$130-180 per session"
    }
  };

  const therapist = therapistData[id];

  if (!therapist) {
    return <div className="text-center py-20">Therapist not found</div>;
  }

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:flex">
            {/* Left Column - Photo and Basic Info */}
            <div className="md:w-1/3 p-6 bg-gray-50">
              <img
                src={therapist.image}
                alt={therapist.name}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h1 className="text-2xl font-bold text-primary-900 mb-2">{therapist.name}</h1>
              <p className="text-gray-600 mb-4">{therapist.title}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {"★".repeat(Math.floor(therapist.rating))}
                </div>
                <span className="ml-2 text-gray-600">
                  {therapist.rating} ({therapist.reviews} reviews)
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Languages</h3>
                  <p>{therapist.languages.join(", ")}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Availability</h3>
                  <p>{therapist.availability}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Rate</h3>
                  <p>{therapist.rate}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Detailed Info */}
            <div className="md:w-2/3 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">About Me</h2>
                <p className="text-gray-600">{therapist.approach}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {therapist.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Education & Experience</h2>
                <p className="text-gray-600 mb-2">{therapist.education}</p>
                <p className="text-gray-600">Experience: {therapist.experience}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Session Types</h2>
                <div className="flex flex-wrap gap-2">
                  {therapist.sessionTypes.map((type, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Insurance Accepted</h2>
                <div className="flex flex-wrap gap-2">
                  {therapist.insurance.map((ins, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {ins}
                    </span>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Schedule Consultation
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        therapist={{ ...therapist, id }}
      />
    </div>
  );
};

export default TherapistProfile; 