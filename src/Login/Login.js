import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchPost from '../Fetchhooks/useFetchPost';
import LoginPage from './Loginpage';
import useLoginForm from './useLoginForm';
import validateForm from '../Universal/ValidateForm';
import { authContext } from '../useAuth';

const Login = () => {
  const [error, setError] = useState({});
  const [url, setUrl] = useState('');
  const { handleChange, values } = useLoginForm();
  let navigate = useNavigate();
  const context = useContext(authContext);
  const { login } = context;

  const loginUrl = 'https://akera-logistics.herokuapp.com/api/v1/login';

  const { data, fetchError, isLoading } = useFetchPost(url, values);
  useEffect(() => {
    setUrl('');
    if (data !== null && Object.keys(error).length === 0) {
      localStorage.clear();
      if (values.email.includes('@sendit')) {
        localStorage.setItem('admin', JSON.stringify(data.admin));
        localStorage.setItem('users', JSON.stringify(data.users));
        localStorage.setItem('packages', JSON.stringify(data.packages));
        login().then(() => {
          navigate('/adminpage');
        });
      } else {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('packages', JSON.stringify(data.packages));
        login().then(() => {
          navigate('/dashboard');
        });
      }
    }
  }, [fetchError, data, error, values, navigate, login]);

  useEffect(() => {
    if (Object.keys(fetchError).length !== 0) {
      setError(fetchError);
      setUrl('');
    }
  }, [fetchError]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(values);
    if (Object.keys(errors).length === 0) {
      setError(errors);
      setUrl(loginUrl);
    } else {
      setError(errors);
      setUrl('');
    }
  };
  return (
    <div className='flex items-center bg-gray-100 justify-center w-full h-screen'>
      <LoginPage
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        values={values}
      />
    </div>
  );
};

export default Login;
