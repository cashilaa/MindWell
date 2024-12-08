import { useState } from 'react';
import { motion } from 'framer-motion';

const mockAppointments = [
  {
    id: 1,
    therapist: 'Dr. Sarah Johnson',
    date: '2024-02-20',
    time: '10:00 AM',
    type: 'Video Session',
    status: 'upcoming',
  },
  {
    id: 2,
    therapist: 'Dr. Michael Chen',
    date: '2024-02-15',
    time: '2:30 PM',
    type: 'In-Person',
    status: 'completed',
  },
];

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [appointments, setAppointments] = useState(mockAppointments);

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.status === activeTab
  );

  const AppointmentCard = ({ appointment }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {appointment.therapist}
        </h3>
        <span className={`px-3 py-1 rounded-full text-sm ${
          appointment.status === 'upcoming'
            ? 'bg-primary-100 text-primary-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {appointment.status === 'upcoming' ? 'Upcoming' : 'Completed'}
        </span>
      </div>

      <div className="space-y-2 text-gray-600">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{new Date(appointment.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
        
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{appointment.time}</span>
        </div>

        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>{appointment.type}</span>
        </div>
      </div>

      {appointment.status === 'upcoming' && (
        <div className="mt-6 flex space-x-4">
          <button className="btn-primary">
            Join Session
          </button>
          <button className="btn-secondary">
            Reschedule
          </button>
          <button className="btn-secondary text-red-600 hover:bg-red-50">
            Cancel
          </button>
        </div>
      )}

      {appointment.status === 'completed' && (
        <div className="mt-6 flex space-x-4">
          <button className="btn-primary">
            Book Follow-up
          </button>
          <button className="btn-secondary">
            Leave Review
          </button>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            My Appointments
          </h2>

          {/* Tabs */}
          <div className="flex space-x-4 mb-8">
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-primary-100 text-primary-800'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'bg-primary-100 text-primary-800'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
          </div>

          {/* Appointments List */}
          <div className="space-y-6">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No {activeTab} appointments
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {activeTab === 'upcoming'
                    ? 'Book a session with a therapist to get started'
                    : 'Your completed appointments will appear here'}
                </p>
                {activeTab === 'upcoming' && (
                  <div className="mt-6">
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => {/* Navigate to therapist directory */}}
                    >
                      Find a Therapist
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
