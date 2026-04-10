import { mockStudentProfile, mockNotifications } from '../utils/mockData';

export const matchJD = async (jdText) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mocked array of matches (TPO view)
  return [
    { student: mockStudentProfile, match_percentage: 98 },
    { student: { ...mockStudentProfile, _id: "sp124", full_name: "Elena Rostova", cgpa: 8.9 }, match_percentage: 84 },
  ];
};

export const generateFeedback = async (studentId, jdText) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newFeedback = {
    _id: `notif_${Date.now()}`,
    student_id: studentId,
    type: "Skill_Feedback",
    title: "Real-time JD Analysis",
    message: "You missed the recent 'AI Product Manager' role.",
    missing_skills: ["Product Strategy", "Jira"],
    action_item: "Consider taking a short course on Agile Product Management to bridge this gap.",
    is_read: false,
    date: "Just Now"
  };
  
  return newFeedback;
};

// --- Authentication Mocks ---

export const loginMock = async (email, password, role) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simple validation for mock
  if (!email || !password) throw new Error("Email and password required");

  // Mock returning a user mapping the Users schema shape
  return {
    _id: "u123",
    email: email,
    role: role, // 'student' or 'tpo'
    token: "mock-jwt-token-12345"
  };
};

export const signupMock = async (email, password, role, fullName) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (!email || !password || !fullName) throw new Error("Missing required fields");

  return {
    _id: `u_${Date.now()}`,
    email: email,
    role: role,
    token: "mock-jwt-token-new"
  };
};

