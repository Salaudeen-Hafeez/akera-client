import Navbar from '../Universal/Navbar';
import Banner from './Banner';
import Main from './Main';
import { authContext } from '../useAuth';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Home = ({ homeNav, message }) => {
  const context = useContext(authContext);
  const { userAuthed } = context;
  const location = useLocation();
  return userAuthed === null ? (
    <div>
      <Navbar linkItems={homeNav} />
      <Banner />
      <Main message={message} />
    </div>
  ) : userAuthed.user ? (
    <Navigate to="/dashboard" replace state={{ path: location.pathname }} />
  ) : (
    <Navigate to="/adminpage" replace state={{ path: location.pathname }} />
  );
};

export default Home;
