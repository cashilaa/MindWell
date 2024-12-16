import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import BookingModal from '../components/BookingModal';

// Mock therapist data
const mockTherapists = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    specialties: ['Anxiety', 'Depression', 'Trauma'],
    languages: ['English', 'Chinese'],
    sessionTypes: ['Online', 'In-person'],
    price: '$120-150',
    priceRange: '100-150',
    rating: 4.9,
    availability: 'Next week',
    clinic: 'Mind & Body Wellness Centre',
    location: 'Central Singapore',
    region: 'Central',
    address: 'Orchard Road, #08-01 Medical Centre'
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
    clinic: 'Healing Hearts Clinic',
    location: 'East Singapore',
    region: 'East',
    address: 'Tampines Central, #03-22'
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
    clinic: 'Mind & Body Wellness Centre',
    location: 'Central Singapore',
    region: 'Central',
    address: 'Orchard Road, #08-02 Medical Centre'
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
    clinic: 'Serenity Mental Health',
    location: 'West Singapore',
    region: 'West',
    address: 'Jurong East, #05-11 Healthcare Hub'
  },
];

const TherapistDirectory = () => {
  const [filters, setFilters] = useState({
    specialty: '',
    sessionType: '',
    language: '',
    priceRange: '',
    region: '',
    clinic: ''
  });
  const [therapists, setTherapists] = useState(mockTherapists);
  const [filteredTherapists, setFilteredTherapists] = useState(mockTherapists);
  const [matchedTherapists, setMatchedTherapists] = useState(null);
  const location = useLocation();
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Extract unique clinics and regions from therapist data
  const clinics = [...new Set(mockTherapists.map(t => t.clinic))];
  const regions = [...new Set(mockTherapists.map(t => t.region))];

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

    // Apply region filter
    if (filters.region) {
      filtered = filtered.filter(therapist =>
        therapist.region === filters.region
      );
    }

    // Apply clinic filter
    if (filters.clinic) {
      filtered = filtered.filter(therapist =>
        therapist.clinic === filters.clinic
      );
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

  const handleBooking = (therapist) => {
    setSelectedTherapist(therapist);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Section */}
          <div className="w-full md:w-1/4 lg:w-1/5">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Filters</h2>
              <div className="flex flex-col gap-5">
                <div className="filter-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialty
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#BE8B69] focus:ring focus:ring-[#BE8B69] focus:ring-opacity-50"
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

                <div className="filter-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Type
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#BE8B69] focus:ring focus:ring-[#BE8B69] focus:ring-opacity-50"
                    value={filters.sessionType}
                    onChange={(e) => handleFilterChange('sessionType', e.target.value)}
                  >
                    <option value="">All Types</option>
                    <option value="online">Online</option>
                    <option value="in-person">In-Person</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#BE8B69] focus:ring focus:ring-[#BE8B69] focus:ring-opacity-50"
                    value={filters.language}
                    onChange={(e) => handleFilterChange('language', e.target.value)}
                  >
                    <option value="">All Languages</option>
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="mandarin">Mandarin</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#BE8B69] focus:ring focus:ring-[#BE8B69] focus:ring-opacity-50"
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  >
                    <option value="">All Prices</option>
                    <option value="0-100">$0-100</option>
                    <option value="100-150">$100-150</option>
                    <option value="150+">$150+</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#BE8B69] focus:ring focus:ring-[#BE8B69] focus:ring-opacity-50"
                    value={filters.region}
                    onChange={(e) => handleFilterChange('region', e.target.value)}
                  >
                    <option value="">All Regions</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clinic
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#BE8B69] focus:ring focus:ring-[#BE8B69] focus:ring-opacity-50"
                    value={filters.clinic}
                    onChange={(e) => handleFilterChange('clinic', e.target.value)}
                  >
                    <option value="">All Clinics</option>
                    {clinics.map(clinic => (
                      <option key={clinic} value={clinic}>{clinic}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Therapist Cards Section */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTherapists.map((therapist) => (
                <motion.div
                  key={therapist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"
                >
                  <div className="relative h-40 md:h-56 lg:h-64">
                    <img
                      src={therapist.image}
                      alt={therapist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{therapist.name}</h3>
                    <div className="text-sm md:text-base text-gray-600 mb-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {therapist.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-[#BE8B69] bg-opacity-10 text-[#BE8B69] px-2 py-1 rounded-full text-sm"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <p className="flex items-center gap-2">
                          <span className="font-medium">Languages:</span> 
                          {therapist.languages.join(', ')}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="font-medium">Sessions:</span> 
                          {therapist.sessionTypes.join(', ')}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="font-medium">Price:</span> 
                          {therapist.price}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="font-medium">Available:</span> 
                          {therapist.availability}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="font-medium">Clinic:</span> 
                          {therapist.clinic}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="font-medium">Location:</span> 
                          {therapist.location}
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button 
                        onClick={() => handleBooking(therapist)}
                        className="w-full bg-[#BE8B69] text-white py-2.5 rounded-md text-base font-medium hover:bg-[#977669] transition-colors"
                      >
                        Book Consultation
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedTherapist && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedTherapist(null);
          }}
          therapist={selectedTherapist}
        />
      )}
    </div>
  );
};

export default TherapistDirectory;
