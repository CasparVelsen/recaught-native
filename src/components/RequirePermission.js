import { Navigate } from 'react-router-dom';

export default function RequirePermission({ token, children }) {
  return token ? children : <Navigate to="/login" />;
}
