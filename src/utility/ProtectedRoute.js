import {Navigate} from 'react-router-dom';

export const ProtectedRoute = ({ isLogged, children }) => {
  if (!isLogged) {
    return <Navigate to="/" replace />;
  }

  return children;
};