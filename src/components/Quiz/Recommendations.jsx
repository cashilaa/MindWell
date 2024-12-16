import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuiz } from './QuizContext';
import { useNavigate } from 'react-router-dom';

const matchTherapist = (answers, therapist) => {
  let score = 0;
  const weights = {
    format: 3,
    specialties: 2,
    availability: 1,
    culture: 3,
    lgbtq: 2,
    price: 3
  };

  // Check format match
  if (therapist.formats.includes(answers.format)) {
    score += weights.format;
  }

  // Check price range match
  if (therapist.priceRange === answers.budget) {
    score += weights.price;
  }

  // Check cultural background match
  if (answers.culturalBackground && 
      therapist.culturalBackgrounds.includes(answers.culturalBackground)) {
    score += weights.culture;
  }

  // Check specialty matches
  if (answers.concerns) {
    const matchingSpecialties = therapist.specialties.filter(specialty =>
      answers.concerns.includes(specialty)
    );
    score += matchingSpecialties.length * weights.specialties;
  }

  // Check availability match
  if (therapist.availability.includes(answers.preferredTime)) {
    score += weights.availability;
  }

  // Check LGBTQ+ friendly if specified
  if (answers.lgbtqSupport && therapist.lgbtqFriendly) {
    score += weights.lgbtq;
  }

  return score;
};

const Recommendations = () => {
  const { quizState, resetQuiz } = useQuiz();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);

  // Sample therapist data - In production, this would come from your backend
  const therapists = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Clinical Psychologist",
      specialties: ["anxiety", "depression", "relationships"],
      formats: ["in-person", "video"],
      availability: ["weekday-day", "weekday-evening"],
      culturalBackgrounds: ["western", "asian"],
      priceRange: "moderate",
      lgbtqFriendly: true,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      rating: 4.9,
      reviews: 127,
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      title: "Psychiatrist",
      specialties: ["anxiety", "depression", "self-growth"],
      formats: ["video", "audio"],
      availability: ["weekend", "flexible"],
      culturalBackgrounds: ["asian"],
      priceRange: "high",
      lgbtqFriendly: true,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      rating: 4.8,
      reviews: 93,
    },
    {
      id: 3,
      name: "Emma Williams",
      title: "Licensed Counselor",
      specialties: ["relationships", "self-growth"],
      formats: ["in-person", "video", "chat"],
      availability: ["weekday-evening", "weekend"],
      culturalBackgrounds: ["western"],
      priceRange: "low",
      lgbtqFriendly: true,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      rating: 4.9,
      reviews: 156,
    },
  ];

  useEffect(() => {
    const sortedTherapists = therapists
      .map(therapist => ({
        ...therapist,
        score: matchTherapist(quizState.answers, therapist)
      }))
      .sort((a, b) => b.score - a.score)
      .filter(t => t.score > 0)
      .slice(0, 5); // Top 5 matches

    setRecommendations(sortedTherapists);
  }, [quizState.answers]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-primary-900 mb-4 text-center">
            Your Personalized Recommendations
          </h1>
          <p className="text-xl text-gray-600 mb-12 text-center">
            Based on your responses, we've found these mental health professionals who might be a great fit for you.
          </p>

          {/* Therapist Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((therapist) => (
              <motion.div
                key={therapist.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
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
                    {therapist.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <button
                    className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    onClick={() => navigate(`/therapist/${therapist.id}`)}
                  >
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-12 flex justify-center gap-4">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => navigate('/therapists')}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              View All Therapists
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Recommendations;