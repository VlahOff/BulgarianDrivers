import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
  if (!props.user) {
    return <Navigate to="/login" replace />;
  }
  return props.children;
};

export default ProtectedRoute;