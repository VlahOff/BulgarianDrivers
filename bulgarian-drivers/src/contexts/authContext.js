import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '../hooks/useLocalStorage';
import * as authService from '../services/authService';
import ErrorContext from './errorContext';
import { useLoadingContext } from './loadingContext';

const AuthContext = createContext({
	onLoginSubmit: () => {},
	onRegisterSubmit: () => {},
	onLogout: () => {},
	onAccountDeletion: () => {},
	user: undefined,
});

export const AuthProvider = props => {
	const navigate = useNavigate();
	const { setErrorMessage } = useContext(ErrorContext);
	const [startLoading, stopLoading] = useLoadingContext();
	const [user, setUser] = useLocalStorage('userData', undefined);

	const onLoginSubmit = async data => {
		startLoading();
		authService
			.login({
				email: data.email,
				password: data.password,
			})
			.then(response => {
				if (response.errorMessage) {
					setErrorMessage(response.errorMessage);
					return;
				}

				setUser(response);
				navigate('/');
			})
			.catch(setErrorMessage)
			.finally(stopLoading);
	};

	const onRegisterSubmit = async data => {
		startLoading();
		authService
			.register({
				email: data.email,
				username: data.username,
				password: data.password,
			})
			.then(response => {
				if (response.errorMessage) {
					setErrorMessage(response.errorMessage);
					return;
				}

				setErrorMessage(response.message);
				navigate('/login');
			})
			.catch(setErrorMessage)
			.finally(stopLoading);
	};

	const onLogout = async () => {
		startLoading();
		authService
			.logout()
			.then(response => {
				if (response.errorMessage) {
					setErrorMessage(response.errorMessage);
					return;
				}

				setUser(undefined);
				navigate('/');
			})
			.catch(setErrorMessage)
			.finally(stopLoading);
	};

	const onAccountDeletion = async password => {
		startLoading();
		authService
			.deleteAccount({ password: password })
			.then(res => {
				if (res.errorMessage) {
					setErrorMessage(res.errorMessage);
					return;
				}

				setUser(undefined);
				setErrorMessage(res.message);
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

export const useAuthContext = () => {
	const ctx = useContext(AuthContext);

	return ctx;
};
