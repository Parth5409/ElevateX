import api from './api';

export const getTpoAnalytics = async () => {
  const response = await api.get('/api/tpo/analytics');
  return response.data;
};

export const listStudents = async (filters = {}) => {
  const response = await api.get('/api/tpo/students', { params: filters });
  return response.data;
};

export const listInternships = async (filters = {}) => {
  const response = await api.get('/api/tpo/internships', { params: filters });
  return response.data;
};

export const updateInternshipStatus = async (id, status) => {
  const response = await api.patch(`/api/tpo/internships/${id}`, { status });
  return response.data;
};

export const sendInvite = async (studentId, inviteData) => {
  const response = await api.post(`/api/tpo/invite/${studentId}`, inviteData);
  return response.data;
};
