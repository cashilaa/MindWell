import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { appointmentApi } from '../services/appointment';

const Appointments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAppointments();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentApi.getUserAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await appointmentApi.updateAppointment(appointmentId, 'cancelled');
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      await appointmentApi.deleteAppointment(appointmentId);
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  // Component for non-logged-in users
  const LoginPrompt = () => (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Book Your Therapy Session
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            To book a session and manage your appointments, please create an account or log in.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/signup"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="border border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Log In
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );

  // Component for logged-in users
  const AppointmentsList = () => {
    const upcomingAppointments = appointments.filter(
      app => new Date(app.date) >= new Date() && app.status !== 'cancelled'
    );
    
    const pastAppointments = appointments.filter(
      app => new Date(app.date) < new Date() || app.status === 'cancelled'
    );

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h1 className="text-3xl font-bold text-gray-900">Your Appointments</h1>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Upcoming Appointments
              </h2>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {appointment.therapistName}
                          </h3>
                          <p className="text-gray-600">
                            {new Date(appointment.date).toLocaleDateString()} at{' '}
                            {appointment.time}
                          </p>
                          <p className="text-gray-500">{appointment.type} Session</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/reschedule/${appointment.id}`)}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => handleCancel(appointment.id)}
                            className="text-red-600 hover:text-red-700 font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No upcoming appointments</p>
              )}
            </div>

            {/* Past Appointments */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Past Appointments
              </h2>
              {pastAppointments.length > 0 ? (
                <div className="space-y-4">
                  {pastAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {appointment.therapistName}
                          </h3>
                          <p className="text-gray-600">
                            {new Date(appointment.date).toLocaleDateString()} at{' '}
                            {appointment.time}
                          </p>
                          <p className="text-gray-500">
                            Status: {appointment.status.charAt(0).toUpperCase() + 
                                    appointment.status.slice(1)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete(appointment.id)}
                          className="text-red-600 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No past appointments</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return user ? <AppointmentsList /> : <LoginPrompt />;
};

export default Appointments;
