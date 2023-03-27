import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { deleteAccount, login, logout, register } from '../services/authService';
import { useLoadingContext } from './loadingContext';
import ErrorContext from './errorContext';

const AuthContext = createContext({
  onLoginSubmit: () => { },
  onRegisterSubmit: () => { },
  onLogout: () => { },
  onAccountDeletion: () => { },
  user: undefined
});

export const AuthProvider = (props) => {
  const navigate = useNavigate();
  const errorCtx = useContext(ErrorContext);
  const [startLoading, stopLoading] = useLoadingContext();
  const [user, setUser] = useLocalStorage('userData', undefined);

  const onLoginSubmit = async (data) => {
    startLoading();
    const response = await login({ email: data.email, password: data.password });

    if (response.message) {
      errorCtx.setErrorMessage(response.message);
      return;
    }

    setUser(response);
    stopLoading();
    navigate('/');
  };

  const onRegisterSubmit = async (data) => {
    startLoading();
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
    stopLoading();
    navigate('/');
  };

  const onLogout = async () => {
    startLoading();
    await logout();
    setUser(undefined);
    stopLoading();
    navigate('/');
  };

  const onAccountDeletion = async (password) => {
    startLoading();
    await deleteAccount({ password: password });
    setUser(undefined);
    stopLoading();
    navigate('/');
  };

  return <AuthContext.Provider
    value={{
      onLoginSubmit,
      onRegisterSubmit,
      onLogout,
      onAccountDeletion,
      user
    }}
  >
    {props.children}
  </AuthContext.Provider>;
};

export default AuthContext;