import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Mock therapist data
const mockTherapists = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    specialties: ['Anxiety', 'Depression', 'Trauma'],
    languages: ['English', 'Spanish'],
    sessionTypes: ['Online', 'In-person'],
    price: '$120-150',
    rating: 4.9,
    availability: 'Next week',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    specialties: ['Relationships', 'Anxiety', 'Work Stress'],
    languages: ['English', 'Mandarin'],
    sessionTypes: ['Online'],
    price: '$100-130',
    rating: 4.8,
    availability: 'This week',
  },
  // Add more therapists as needed
];

const TherapistDirectory = () => {
  const [filters, setFilters] = useState({
    specialty: '',
    sessionType: '',
    language: '',
    priceRange: '',
  });
  const [therapists, setTherapists] = useState(mockTherapists);
  const location = useLocation();

  useEffect(() => {
    // In a real app, you would use the quiz answers to filter therapists
    const quizAnswers = location.state?.quizAnswers;
    if (quizAnswers) {
      // Apply filtering based on quiz answers
      console.log('Quiz answers:', quizAnswers);
    }
  }, [location]);

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
    // In a real app, you would apply the filters here
  };

  const TherapistCard = ({ therapist }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={therapist.image}
            alt={therapist.name}
          />
        </div>
        <div className="p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">{therapist.name}</h3>
            <span className="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
              {therapist.rating} ★
            </span>
          </div>
          
          <div className="mt-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {therapist.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
            
            <div className="space-y-2 text-gray-600">
              <p>Languages: {therapist.languages.join(', ')}</p>
              <p>Session Types: {therapist.sessionTypes.join(', ')}</p>
              <p>Price Range: {therapist.price}</p>
              <p className="text-primary-600">Next Available: {therapist.availability}</p>
            </div>

            <div className="mt-6 flex space-x-4">
              <button className="btn-primary">
                Book Session
              </button>
              <button className="btn-secondary">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty
              </label>
              <select
                className="input"
                value={filters.specialty}
                onChange={(e) => handleFilterChange('specialty', e.target.value)}
              >
                <option value="">All Specialties</option>
                <option value="anxiety">Anxiety</option>
                <option value="depression">Depression</option>
                <option value="relationships">Relationships</option>
                <option value="trauma">Trauma</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Type
              </label>
              <select
                className="input"
                value={filters.sessionType}
                onChange={(e) => handleFilterChange('sessionType', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="online">Online</option>
                <option value="in-person">In-Person</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                className="input"
                value={filters.language}
                onChange={(e) => handleFilterChange('language', e.target.value)}
              >
                <option value="">All Languages</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="mandarin">Mandarin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select
                className="input"
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              >
                <option value="">All Prices</option>
                <option value="0-100">$0-100</option>
                <option value="100-150">$100-150</option>
                <option value="150+">$150+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {therapists.map((therapist) => (
            <TherapistCard key={therapist.id} therapist={therapist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TherapistDirectory;
