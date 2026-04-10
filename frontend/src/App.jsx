import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardLayout from './components/layout/DashboardLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import StudentInternships from './pages/student/StudentInternships';
import StudentAIMentor from './pages/student/StudentAIMentor';

// TPO Pages
import TpoDashboard from './pages/tpo/TpoDashboard';
import TpoJdMatchmaker from './pages/tpo/TpoJdMatchmaker';
import TpoDirectory from './pages/tpo/TpoDirectory';
import TpoInternshipApprovals from './pages/tpo/TpoInternshipApprovals';

// Protected Route Component Definition
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);
  
  if (loading) return <div className="h-screen w-screen flex items-center justify-center text-white bg-background">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect logic if wrong role
    return user.role === 'tpo' ? <Navigate to="/tpo/dashboard" replace /> : <Navigate to="/student/dashboard" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route element={<DashboardLayout />}>
          {/* Student Routes (Locked to 'student' role) */}
          <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/profile" element={<ProtectedRoute allowedRoles={['student']}><StudentProfile /></ProtectedRoute>} />
          <Route path="/student/internships" element={<ProtectedRoute allowedRoles={['student']}><StudentInternships /></ProtectedRoute>} />
          <Route path="/student/ai-mentor" element={<ProtectedRoute allowedRoles={['student']}><StudentAIMentor /></ProtectedRoute>} />
          
          {/* TPO Routes (Locked to 'tpo' role) */}
          <Route path="/tpo/dashboard" element={<ProtectedRoute allowedRoles={['tpo']}><TpoDashboard /></ProtectedRoute>} />
          <Route path="/tpo/jd-matchmaker" element={<ProtectedRoute allowedRoles={['tpo']}><TpoJdMatchmaker /></ProtectedRoute>} />
          <Route path="/tpo/directory" element={<ProtectedRoute allowedRoles={['tpo']}><TpoDirectory /></ProtectedRoute>} />
          <Route path="/tpo/internship-approvals" element={<ProtectedRoute allowedRoles={['tpo']}><TpoInternshipApprovals /></ProtectedRoute>} />
        </Route>
        
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
