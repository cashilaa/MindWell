import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { appointmentApi } from '../services/appointment';

const BookingModal = ({ isOpen, onClose, therapist }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [bookingDetails, setBookingDetails] = useState({
    sessionType: '',
    date: '',
    time: '',
    concerns: '',
    insurance: '',
    preferredContact: 'email'
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setBookingDetails({
      ...bookingDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!user) {
      navigate('/login', {
        state: {
          from: `/therapist/${therapist.id}`,
          message: "Please log in to book a consultation",
          bookingDetails
        }
      });
      return;
    }

    try {
      const appointmentData = {
        therapistId: therapist.id,
        therapistName: therapist.name,
        therapistImage: therapist.image,
        userId: user.uid,
        userEmail: user.email,
        status: 'pending',
        ...bookingDetails,
        createdAt: new Date().toISOString()
      };

      // Create the appointment
      const response = await appointmentApi.createAppointment(appointmentData);

      // Close modal and navigate to appointments page
      onClose();
      navigate('/appointments', {
        state: {
          newAppointment: response,
          message: "Your consultation has been successfully booked!"
        }
      });
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Session Type
        </label>
        <select
          name="sessionType"
          value={bookingDetails.sessionType}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg"
          required
        >
          <option value="">Select a session type</option>
          {therapist.sessionTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Date
        </label>
        <input
          type="date"
          name="date"
          value={bookingDetails.date}
          onChange={handleInputChange}
          min={new Date().toISOString().split('T')[0]}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Time
        </label>
        <select
          name="time"
          value={bookingDetails.time}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg"
          required
        >
          <option value="">Select a time</option>
          {["Morning", "Afternoon", "Evening"].map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>
      <button
        onClick={() => setStep(2)}
        className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700"
      >
        Next
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      {error && (
        <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Brief description of your concerns
        </label>
        <textarea
          name="concerns"
          value={bookingDetails.concerns}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg"
          rows="3"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Insurance Provider (if applicable)
        </label>
        <input
          type="text"
          name="insurance"
          value={bookingDetails.insurance}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Contact Method
        </label>
        <select
          name="preferredContact"
          value={bookingDetails.preferredContact}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg"
          required
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Booking...' : 'Request Consultation'}
        </button>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Book Consultation</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${step === 1 ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
                  1. Schedule
                </span>
                <span className={`text-sm ${step === 2 ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
                  2. Details
                </span>
              </div>
              <div className="h-1 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-primary-600 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 2) * 100}%` }}
                />
              </div>
            </div>

            {step === 1 ? renderStep1() : renderStep2()}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal; 