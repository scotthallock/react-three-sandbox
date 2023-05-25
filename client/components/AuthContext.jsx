import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = useState(null);

  const navigate = useNavigate();

  const logout = () => {
    const [user, setUser] = auth;
    setUser(null);
    navigate('/');
    console.log('logged out');
  };

  return <AuthContext.Provider value={{ auth, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('AuthContext can only be used inside AuthProvider');
  }

  return value;
};
