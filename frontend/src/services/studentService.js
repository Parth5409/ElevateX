import api from './api';

export const getStudentProfile = async () => {
  const response = await api.get('/api/student/profile');
  return response.data;
};

export const updateStudentProfile = async (profileData) => {
  const response = await api.put('/api/student/profile', profileData);
  return response.data;
};

export const getStudentInternships = async () => {
  const response = await api.get('/api/student/internships');
  return response.data;
};

export const submitInternship = async (internshipData) => {
  const response = await api.post('/api/student/internships', internshipData);
  return response.data;
};

export const getStudentNotifications = async () => {
  const response = await api.get('/api/student/notifications');
  return response.data;
};
