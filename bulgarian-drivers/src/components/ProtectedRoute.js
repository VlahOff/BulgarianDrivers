import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import AuthContext from '../contexts/authContext';

const ProtectedRoute = props => {
	const { user } = useContext(AuthContext);

	if (!user) {
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}

	return props.children;
};

export default ProtectedRoute;
