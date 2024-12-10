import { api } from './api';

export const therapistApi = {
  getAllTherapists: async () => {
    const response = await api.get('/therapists');
    return response.data;
  },

  getTherapist: async (id) => {
    const response = await api.get(`/therapists/${id}`);
    return response.data;
  },

  createTherapist: async (therapistData) => {
    const response = await api.post('/therapists', therapistData);
    return response.data;
  },
};
