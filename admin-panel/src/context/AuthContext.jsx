import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.success && res.user) {
            setUser(res.user);
          } else {
            logout();
          }
        } catch (err) {
          console.error('Session verification failed:', err);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.login({ email, password });
      if (res.success && res.token) {
        localStorage.setItem('admin_token', res.token);
        setToken(res.token);
        setUser(res.user);
        setLoading(false);
        return { success: true, user: res.user };
      }
      throw new Error(res.message || 'Authentication failed');
    } catch (err) {
      setLoading(false);
      const msg = err.message || 'Invalid credentials. Please try again.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setUser(null);
    authService.logout().catch(() => {});
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
