import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isUserLogged } from './store/auth-actions';
import { useEffect } from 'react';

const ProtectedRoute = (props) => {
  const user = useSelector(state => state.auth.user);
  console.log(user);
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return props.children;
};

export default ProtectedRoute;
