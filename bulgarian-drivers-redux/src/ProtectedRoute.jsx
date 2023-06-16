import { Navigate } from 'react-router-dom';

const ProtectedRoute = props => {
	const userData = localStorage.getItem('userData');

	if (!userData) {
		return (
			<Navigate
				to="/login"
				replace={true}
			/>
		);
	}

	return props.children;
};

export default ProtectedRoute;
