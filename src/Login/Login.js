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

  const userUrl = 'https://akera-logistics.herokuapp.com/api/v1/users/login';
  const adminUrl =
    'https://akera-logistics.herokuapp.com/api/v1/users/admins/login';

  const { data, fetchError, isLoading } = useFetchPost(url, values);
  useEffect(() => {
    setUrl('');
    if (data !== null && Object.keys(error).length === 0) {
      sessionStorage.clear();
      if (values.email.includes('@sendit')) {
        sessionStorage.setItem('adminData', JSON.stringify(data));
        login().then(() => {
          navigate('/adminpage');
        });
      } else {
        sessionStorage.setItem('userData', JSON.stringify(data));
        login().then(() => {
          navigate('/dashboard');
        });
      }
    }
  }, [fetchError, data, error, values, navigate, login]);

  useEffect(() => {
    if (Object.keys(fetchError).length === 0) {
      setError(fetchError);
      setUrl('');
    }
  }, [fetchError]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(values);
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      setError(errors);
      if (!values.email.includes('@sendit.com')) {
        setUrl(userUrl);
      } else {
        setUrl(adminUrl);
      }
    } else {
      setError(errors);
      setUrl('');
    }
  };
  console.log(error);
  return (
    <div className="flex items-center bg-gray-100 justify-center w-full h-screen">
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
