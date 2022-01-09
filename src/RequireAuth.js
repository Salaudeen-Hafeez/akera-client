import { authContext } from './useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
const RequireAuth = ({ children }) => {
  const selectedPackage = JSON.parse(sessionStorage.getItem('selectedPackage'));

  const context = useContext(authContext);
  const { userAuthed } = context;
  const location = useLocation();
  switch (location.pathname) {
    case '/packagepage':
      return userAuthed !== null && selectedPackage !== null ? (
        children
      ) : userAuthed !== null ? (
        <Navigate to="/dashboard" replace state={{ path: location.pathname }} />
      ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
      );
    case '/login':
      return userAuthed === null ? (
        children
      ) : userAuthed !== null && userAuthed.user ? (
        <Navigate to="/dashboard" replace state={{ path: location.pathname }} />
      ) : (
        <Navigate to="/adminpage" replace state={{ path: location.pathname }} />
      );
    case '/addpackage':
      return userAuthed !== null && userAuthed.user ? (
        children
      ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
      );
    case '/dashboard':
      return userAuthed !== null && userAuthed.user ? (
        children
      ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
      );
    case '/adminpage':
      return userAuthed !== null && userAuthed.admin ? (
        children
      ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
      );
    default:
      return children;
  }
};

export default RequireAuth;
