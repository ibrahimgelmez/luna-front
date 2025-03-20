'use client';
import { useRouter } from 'next/navigation';
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bearerKey, setBearerKey] = useState('');
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedBearerKey = localStorage.getItem('bearerKey');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedBearerKey) {
      setBearerKey(storedBearerKey);
    }
    setIsLoading(false); // Loading is complete
  }, []);

  useEffect(() => {
    // Check if loading is done, and if no bearerKey or user, redirect to login
    if (!isLoading && (!bearerKey || !user)) {
      router.push('/login');
    }
  }, [bearerKey, user, isLoading, router]);

  const login = (userData, token, keepLogged) => {
    setUser(userData);
    setBearerKey(token);

    if (keepLogged) {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('bearerKey', token);
    }
  };

  const logout = () => {
    setUser(null);
    setBearerKey('');

    localStorage.clear('user');
    localStorage.clear('bearerKey');
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{ user, bearerKey, login, logout, setBearerKey }}
    >
      {!isLoading && children}{' '}
      {/* Render children only after loading is complete */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
