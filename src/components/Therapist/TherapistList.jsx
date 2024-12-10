import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TherapistFilters from './TherapistFilters';
import { useNavigate } from 'react-router-dom';

// Sample therapist data - In production, this would come from your API
const therapistsData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Clinical Psychologist",
    specializations: ["Anxiety", "Depression", "LGBTQ+ Support"],
    formats: ["In-person", "Online"],
    languages: ["English", "Spanish"],
    priceRange: "Sliding Scale",
    availability: ["Weekends", "Evenings"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.9,
    reviews: 127,
    location: "New York, NY",
    nextAvailable: "Tomorrow"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    title: "Psychiatrist",
    specializations: ["Depression", "Anxiety", "Career Burnout"],
    formats: ["Online", "Group Sessions"],
    languages: ["English", "Mandarin"],
    priceRange: "Premium",
    availability: ["Immediate/Urgent"],
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.8,
    reviews: 93,
    location: "San Francisco, CA",
    nextAvailable: "Today"
  },
  {
    id: 3,
    name: "Emma Williams",
    title: "Licensed Counselor",
    specializations: ["Relationship Issues", "Trauma and PTSD"],
    formats: ["In-person", "Online"],
    languages: ["English"],
    priceRange: "Free/Low Cost",
    availability: ["Weekends"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.9,
    reviews: 156,
    location: "Chicago, IL",
    nextAvailable: "This week"
  }
];

const TherapistList = () => {
  const [filters, setFilters] = useState({});
  const [filteredTherapists, setFilteredTherapists] = useState(therapistsData);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = therapistsData.filter(therapist => {
      let matches = true;

      // Check specializations
      if (Object.keys(filters.specializations || {}).length > 0) {
        matches = matches && therapist.specializations.some(spec =>
          filters.specializations[spec]
        );
      }

      // Check formats
      if (Object.keys(filters.formats || {}).length > 0) {
        matches = matches && therapist.formats.some(format =>
          filters.formats[format]
        );
      }

      // Check language
      if (filters.language) {
        matches = matches && therapist.languages.includes(filters.language);
      }

      // Check price range
      if (Object.keys(filters.priceRanges || {}).length > 0) {
        matches = matches && filters.priceRanges[therapist.priceRange];
      }

      // Check availability
      if (Object.keys(filters.availability || {}).length > 0) {
        matches = matches && therapist.availability.some(time =>
          filters.availability[time]
        );
      }

      return matches;
    });

    setFilteredTherapists(filtered);
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-80 flex-shrink-0">
            <TherapistFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Therapist Cards */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-4 lg:gap-6">
              {filteredTherapists.map((therapist) => (
                <motion.div
                  key={therapist.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-xl"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/3 md:w-1/4">
                      <img
                        className="h-48 sm:h-full w-full object-cover rounded-t-xl sm:rounded-t-none sm:rounded-l-xl"
                        src={therapist.image}
                        alt={therapist.name}
                      />
                    </div>
                    <div className="flex-1 p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                        <div>
                          <h3 className="text-xl font-bold text-primary-900">
                            {therapist.name}
                          </h3>
                          <p className="text-gray-600">{therapist.title}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1 text-gray-600">
                            {therapist.rating} ({therapist.reviews} reviews)
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2">
                        <div className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="inline-block w-4">📍</span>
                          {therapist.location}
                        </div>
                        <div className="text-sm text-green-600 flex items-center gap-2">
                          <span className="inline-block w-4">⏰</span>
                          Next available: {therapist.nextAvailable}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 my-4">
                        {therapist.specializations.slice(0, 2).map((spec) => (
                          <span
                            key={spec}
                            className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                          >
                            {spec}
                          </span>
                        ))}
                        {therapist.specializations.length > 2 && (
                          <span className="text-gray-600 text-xs">
                            +{therapist.specializations.length - 2} more
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 mt-4">
                        <button
                          onClick={() => navigate(`/therapist/${therapist.id}`)}
                          className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-center"
                        >
                          View Profile
                        </button>
                        <button
                          className="flex-1 border border-primary-600 text-primary-600 py-2 px-4 rounded-lg hover:bg-primary-50 transition-colors text-center"
                        >
                          Quick Book
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredTherapists.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-900">No matches found</h3>
                <p className="text-gray-600 mt-2">Try adjusting your filters to see more results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistList;
