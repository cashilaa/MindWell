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
    priceRange: '100-150',
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
    priceRange: '100-150',
    rating: 4.8,
    availability: 'This week',
  },
  {
    id: 3,
    name: 'Dr. Emma Rodriguez',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80',
    specialties: ['Depression', 'Family Therapy', 'LGBTQ+'],
    languages: ['English', 'Spanish'],
    sessionTypes: ['Online', 'In-person'],
    price: '$90-120',
    priceRange: '0-100',
    rating: 4.7,
    availability: 'This week',
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    specialties: ['Trauma', 'PTSD', 'Anxiety'],
    languages: ['English'],
    sessionTypes: ['In-person'],
    price: '$150-180',
    priceRange: '150+',
    rating: 4.9,
    availability: 'Next week',
  },
];

const TherapistDirectory = () => {
  const [filters, setFilters] = useState({
    specialty: '',
    sessionType: '',
    language: '',
    priceRange: '',
  });
  const [therapists, setTherapists] = useState(mockTherapists);
  const [filteredTherapists, setFilteredTherapists] = useState(mockTherapists);
  const [matchedTherapists, setMatchedTherapists] = useState(null);
  const location = useLocation();

  // Apply filters whenever filters change
  useEffect(() => {
    let filtered = matchedTherapists || mockTherapists;

    // Apply specialty filter
    if (filters.specialty) {
      filtered = filtered.filter(therapist =>
        therapist.specialties.some(s => s.toLowerCase() === filters.specialty.toLowerCase())
      );
    }

    // Apply session type filter
    if (filters.sessionType) {
      filtered = filtered.filter(therapist =>
        therapist.sessionTypes.some(t => t.toLowerCase() === filters.sessionType.toLowerCase())
      );
    }

    // Apply language filter
    if (filters.language) {
      filtered = filtered.filter(therapist =>
        therapist.languages.some(l => l.toLowerCase() === filters.language.toLowerCase())
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(therapist => therapist.priceRange === filters.priceRange);
    }

    setFilteredTherapists(filtered);
  }, [filters, matchedTherapists]);

  // Apply quiz-based filtering when available
  useEffect(() => {
    const matchResults = location.state?.matchResults;
    if (matchResults) {
      // Calculate match scores for each therapist
      const scoredTherapists = mockTherapists.map(therapist => {
        let matchScore = 0;
        let primaryMatchCount = 0;

        // Check primary concerns match (highest priority)
        matchResults.primaryConcerns.forEach(concern => {
          if (therapist.specialties.some(s => s.toLowerCase().includes(concern.toLowerCase()))) {
            matchScore += 10; // Higher score for primary concerns
            primaryMatchCount++;
          }
        });

        // Check other specialties match
        matchResults.specialties.forEach(specialty => {
          if (therapist.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase()))) {
            matchScore += 5;
          }
        });

        // Bonus points for matching multiple primary concerns
        if (primaryMatchCount > 1) {
          matchScore += 10;
        }

        return {
          ...therapist,
          matchScore,
          primaryMatchCount,
        };
      });

      // Sort therapists by match score and primary match count
      const matched = scoredTherapists
        .sort((a, b) => {
          if (b.primaryMatchCount !== a.primaryMatchCount) {
            return b.primaryMatchCount - a.primaryMatchCount;
          }
          return b.matchScore - a.matchScore;
        });

      setMatchedTherapists(matched);
      setFilteredTherapists(matched);
    }
  }, [location]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
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
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{therapist.name}</h3>
              {therapist.matchScore && (
                <span className="text-sm text-primary-600">
                  Match Score: {Math.min(100, Math.round(therapist.matchScore * 5))}%
                </span>
              )}
            </div>
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
          {filteredTherapists.map((therapist) => (
            <TherapistCard key={therapist.id} therapist={therapist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TherapistDirectory;
