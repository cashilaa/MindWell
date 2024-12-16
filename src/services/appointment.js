import { api } from './api';

// At the top of the file:
const STORAGE_KEY = 'mindwell_appointments';

// Initialize from localStorage if available
let mockAppointments = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

export const appointmentApi = {
  createAppointment: async (appointmentData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // For development, store in mock storage
      const newAppointment = {
        id: Date.now(), // Generate unique ID
        ...appointmentData,
      };
      
      mockAppointments.push(newAppointment);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockAppointments));
      return newAppointment;
      
      // When backend is ready, uncomment this:
      // const response = await api.post('/appointments', appointmentData);
      // return response.data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw new Error('Failed to create appointment');
    }
  },

  getUserAppointments: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // For development, return from mock storage
      return mockAppointments;
      
      // When backend is ready, uncomment this:
      // const response = await api.get('/appointments');
      // return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw new Error('Failed to fetch appointments');
    }
  },

  updateAppointment: async (id, status) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // For development, update in mock storage
      const appointment = mockAppointments.find(a => a.id === id);
      if (appointment) {
        appointment.status = status;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockAppointments));
        return appointment;
      }
      throw new Error('Appointment not found');
      
      // When backend is ready, uncomment this:
      // const response = await api.patch(`/appointments/${id}`, { status });
      // return response.data;
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw new Error('Failed to update appointment');
    }
  }
}; 