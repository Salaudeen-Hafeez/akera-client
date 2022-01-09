import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../useAuth';
const Logout = () => {
  const navigate = useNavigate();
  const context = useContext(authContext);
  const { logout } = context;
  sessionStorage.clear();
  useEffect(() => {
    logout();
    navigate('/');
  });
  return null;
};

export default Logout;
