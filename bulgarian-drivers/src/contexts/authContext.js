import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, register } from '../services/authService';

const AuthContext = createContext({
  onLoginSubmit: () => { },
  onRegisterSubmit: () => { },
  onLogout: () => { },
  user: undefined
});

export const AuthProvider = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }

  }, []);

  const onLoginSubmit = async (data) => {
    const response = await login({ email: data.email, password: data.password });

    setUser(response);
    localStorage.setItem('userData', JSON.stringify(response));
    navigate('/');
  };

  const onRegisterSubmit = async (data) => {
    const response = await register({
      email: data.email,
      username: data.username,
      password: data.password
    });

    setUser(response);
    localStorage.setItem('userData', JSON.stringify(response));
    navigate('/');
  };

  const onLogout = () => {
    logout();
    localStorage.removeItem('userData');
    navigate('/');
  };

  return <AuthContext.Provider
    value={{
      onLoginSubmit,
      onRegisterSubmit,
      onLogout,
      user
    }}
  >
    {props.children}
  </AuthContext.Provider>;
};

export default AuthContext;