import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { therapistApi } from '../services/therapist';

const Therapists = () => {
  const [therapists, setTherapists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const data = await therapistApi.getAllTherapists();
        setTherapists(data);
      } catch (err) {
        setError('Failed to load therapists');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTherapists();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading therapists...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Therapists</h1>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {therapists.map((therapist) => (
            <div
              key={therapist.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={therapist.image || 'https://via.placeholder.com/400x300'}
                  alt={therapist.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {therapist.name}
                </h2>
                <p className="text-sm text-primary-600 mb-2">
                  {therapist.specialization}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {therapist.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Experience:</span> {therapist.experience} years
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Expertise:</span> {therapist.expertise}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/therapists/${therapist.id}`)}
                  className="mt-4 w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors duration-300"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Therapists;
