import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  // If there is no token, they aren't logged in. Send them to /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If they have a token, let them through to the page
  return children;
}