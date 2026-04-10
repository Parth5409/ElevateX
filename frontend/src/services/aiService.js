import api from './api';

export const matchJD = async (jdText) => {
  const response = await api.post('/api/ai/match-jd', { jdText });
  return response.data;
};

export const generateFeedback = async (studentId, jdText) => {
  const response = await api.post('/api/ai/generate-feedback', { studentId, jdText });
  return response.data;
};
