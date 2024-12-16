import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { appointmentApi } from '../services/appointment';
import { motion, AnimatePresence } from 'framer-motion';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentApi.getUserAppointments();
      setAppointments(data);
    } catch (err) {
      setError('Failed to load appointments');
      console.error('Error fetching appointments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-20">Loading appointments...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {location.state?.message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 text-green-700 p-4 rounded-lg mb-6"
          >
            {location.state.message}
          </motion.div>
        )}

        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Appointments</h1>

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center gap-4">
                <img
                  src={appointment.therapistImage}
                  alt={appointment.therapistName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{appointment.therapistName}</h3>
                  <p className="text-gray-600">{appointment.sessionType}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-gray-600">{new Date(appointment.date).toLocaleDateString()}</p>
                  <p className="text-gray-600">{appointment.time}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {appointments.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              No appointments scheduled yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
