import * as authService from '../services/authService';
import { authActions } from './auth';
import { uiActions } from './ui';
import { setErrorMessage } from './ui-actions';

export const onLoginSubmit = (data, navigate) => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    authService
      .login({
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.errorMessage) {
          dispatch(setErrorMessage(res.errorMessage));
          return;
        }

        dispatch(authActions.setUser(res));
        localStorage.setItem('userData', JSON.stringify(res));
        navigate('/');
      })
      .catch((err) => dispatch(setErrorMessage(err)))
      .finally(() => dispatch(uiActions.stopLoading()));
  };
};

export const onRegisterSubmit = (data, navigate) => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    authService
      .register({
        email: data.email,
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        if (res.errorMessage) {
          dispatch(setErrorMessage(res.errorMessage));
          return;
        }

        dispatch(setErrorMessage(res.message));
        navigate('/login');
      })
      .catch((err) => dispatch(setErrorMessage(err)))
      .finally(() => dispatch(uiActions.stopLoading()));
  };
};

export const onLogout = (navigate) => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    authService
      .logout()
      .then((res) => {
        if (res.errorMessage) {
          dispatch(setErrorMessage(res.errorMessage));
          return;
        }

        dispatch(authActions.setUser(undefined));
        localStorage.removeItem('userData');
        navigate('/');
      })
      .catch((err) => dispatch(setErrorMessage(err)))
      .finally(dispatch(uiActions.stopLoading()));
  };
};

export const onAccountDeletion = (password, navigate) => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    authService
      .deleteAccount({ password })
      .then((res) => {
        if (res.errorMessage) {
          dispatch(setErrorMessage(res.errorMessage));
          return;
        }

        localStorage.removeItem('userData');
        dispatch(authActions.setUser(undefined));
        dispatch(setErrorMessage(res.message));
        navigate('/');
      })
      .catch((err) => dispatch(setErrorMessage(err)))
      .finally(dispatch(uiActions.stopLoading()));
  };
};

export const isUserLogged = () => {
  return (dispatch) => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      dispatch(authActions.setUser(userData));
    }
  };
};
