import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginMock, signupMock } from '../services/apiMock';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from session storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('elevatex_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    const user = await loginMock(email, password, role);
    setCurrentUser(user);
    localStorage.setItem('elevatex_user', JSON.stringify(user));
    return user;
  };

  const signup = async (email, password, role, fullName) => {
    const user = await signupMock(email, password, role, fullName);
    setCurrentUser(user);
    localStorage.setItem('elevatex_user', JSON.stringify(user));
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('elevatex_user');
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
