import Logout from './Universal/Logout';
import Login from './Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Register/Signup';
import Package from './Postpackage/Package';
import UserPage from './User/Userpage';
import PackageDetail from './User/Packagedetail';
import Admin from './Admin/Admin';
import { AuthProvider } from './useAuth';
import RequireAuth from './RequireAuth';
import Home from './Home/Home';
import PageNotFound from './404';

function App() {
  localStorage.clear();
  const message = {
    packaging: 'We do the packaging',
    seal: 'We seal the package',
    transport: 'We transport the package',
    deliver: 'We deliver the package',
  };

  return (
    <AuthProvider>
      <Router>
        <div className='font-serif'>
          <Routes>
            <Route
              path='/login'
              element={
                <RequireAuth>
                  <Login />
                </RequireAuth>
              }
            />
            <Route path='/' element={<Home message={message} />} />

            <Route path='/signup' element={<SignUp />} />
            <Route
              path='/addpackage'
              element={
                <RequireAuth>
                  <Package />
                </RequireAuth>
              }
            />
            <Route
              path='/dashboard'
              element={
                <RequireAuth>
                  <UserPage />
                </RequireAuth>
              }
            />
            <Route
              path='/packagepage'
              element={
                <RequireAuth>
                  <PackageDetail />
                </RequireAuth>
              }
            />
            <Route
              path='/adminpage'
              element={
                <RequireAuth>
                  <Admin />
                </RequireAuth>
              }
            />
            <Route path='/logout' element={<Logout />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
