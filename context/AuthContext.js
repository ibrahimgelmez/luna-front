'use client';
import { useRouter } from 'next/navigation';
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [bearerKey, setBearerKey] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Yeni state
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
    setIsLoading(false); // Yükleme tamamlandı
  }, []);

  // useEffect(() => {
  //   if (!isLoading && (!bearerKey || !user)) {
  //     router.push('/login');
  //   }
  // }, [bearerKey, user, isLoading]); // Hem bearerKey hem de user değiştiğinde kontrol et

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

    localStorage.removeItem('user');
    localStorage.removeItem('bearerKey');
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{ user, bearerKey, login, logout, setBearerKey }}
    >
      {!isLoading && children}{' '}
      {/* Yüklenme tamamlanmadan önce çocuk bileşenleri render etme */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
