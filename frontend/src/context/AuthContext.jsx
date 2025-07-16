import React, { createContext, useState, useEffect } from 'react';
import api from '../api';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUser({ token });
  }, []);
  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setUser({ token: data.token });
  };
  const register = async (email, password) => {
    const { data } = await api.post('/auth/register', { email, password });
    localStorage.setItem('token', data.token);
    setUser({ token: data.token });
  };
  const logout = () => { localStorage.removeItem('token'); setUser(null); };
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
