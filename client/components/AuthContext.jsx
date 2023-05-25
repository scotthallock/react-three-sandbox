import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = useState({ username: 'hello' });

  return <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('AuthContext can only be used inside AuthProvider');
  }

  return value;
};
