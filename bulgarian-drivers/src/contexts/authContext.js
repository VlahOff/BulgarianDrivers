import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  deleteAccount,
  login,
  logout,
  register,
} from '../services/authService';
import { useLoadingContext } from './loadingContext';
import ErrorContext from './errorContext';

const AuthContext = createContext({
  onLoginSubmit: () => {},
  onRegisterSubmit: () => {},
  onLogout: () => {},
  onAccountDeletion: () => {},
  user: undefined,
});

export const AuthProvider = (props) => {
  const navigate = useNavigate();
  const { setErrorMessage } = useContext(ErrorContext);
  const [startLoading, stopLoading] = useLoadingContext();
  const [user, setUser] = useLocalStorage('userData', undefined);

  const onLoginSubmit = async (data) => {
    startLoading();
    login({
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        if (response.message) {
          setErrorMessage(response.message);
          return;
        }

        setUser(response);
        navigate('/');
      })
      .catch(setErrorMessage)
      .finally(stopLoading);
  };

  const onRegisterSubmit = async (data) => {
    startLoading();
    register({
      email: data.email,
      username: data.username,
      password: data.password,
    })
      .then((response) => {
        if (response.message) {
          setErrorMessage(response.message);
          return;
        }

        setUser(response);
        navigate('/');
      })
      .catch(setErrorMessage)
      .finally(stopLoading);
  };

  const onLogout = async () => {
    startLoading();
    logout()
      .then(() => {
        setUser(undefined);
        navigate('/');
      })
      .catch(setErrorMessage)
      .finally(stopLoading);
  };

  const onAccountDeletion = async (password) => {
    startLoading();
    deleteAccount({ password: password })
      .then(() => {
        setUser(undefined);
        navigate('/');
      })
      .catch(setErrorMessage)
      .finally(stopLoading);
  };

  return (
    <AuthContext.Provider
      value={{
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        onAccountDeletion,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
