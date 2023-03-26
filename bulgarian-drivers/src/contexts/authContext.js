import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { login, logout, register } from '../services/authService';
import ErrorContext from './errorContext';

const AuthContext = createContext({
  onLoginSubmit: () => { },
  onRegisterSubmit: () => { },
  onLogout: () => { },
  user: undefined
});

export const AuthProvider = (props) => {
  const errorCtx = useContext(ErrorContext);
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage('userData', undefined);

  const onLoginSubmit = async (data) => {
    const response = await login({ email: data.email, password: data.password });
    
    if (response.message) {
      errorCtx.setErrorMessage(response.message);
      return;
    }

    setUser(response);
    navigate('/');
  };

  const onRegisterSubmit = async (data) => {
    const response = await register({
      email: data.email,
      username: data.username,
      password: data.password
    });

    if (response.message) {
      errorCtx.setErrorMessage(response.message);
      return;
    }

    setUser(response);
    navigate('/');
  };

  const onLogout = async () => {
    await logout();
    setUser(undefined);
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