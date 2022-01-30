import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignupForm from './useSignupForm';
import useFetchPost from '../Fetchhooks/useFetchPost';
import validateForm from '../Universal/ValidateForm';
import SignupComponent from './SignupComponent';
import { authContext } from '../useAuth';
import Logo from '../Universal/Logo';

const SignUp = () => {
  const [error, setError] = useState({});
  const [url, setUrl] = useState('');
  const navigate = useNavigate();
  const { handleChange, values } = useSignupForm();
  const context = useContext(authContext);
  const { signup } = context;

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(values);
    if (Object.keys(errors).length === 0) {
      setError(errors);
      if (values.email.includes('@sendit.com')) {
        setUrl('https://akera-logistics.herokuapp.com/api/v1/users/admins');
      } else {
        setUrl('https://akera-logistics.herokuapp.com/api/v1/users');
      }
    } else if (Object.keys(errors).length !== 0) {
      setError(errors);
      setUrl('');
    }
  };
  const { data, fetchError, isLoading } = useFetchPost(url, values);
  useEffect(() => {
    if (data !== null && Object.keys(error).length === 0) {
      localStorage.clear();
      if (values.email.includes('@sendit')) {
        localStorage.setItem('adminData', JSON.stringify(data));
        signup().then(() => {
          navigate('/adminpage');
        });
      } else {
        localStorage.setItem('userData', JSON.stringify(data));
        signup().then(() => {
          navigate('/dashboard');
        });
      }
    }
  }, [data, values, error, navigate, signup]);

  useEffect(() => {
    if (Object.keys(fetchError).length !== 0) {
      setError(fetchError);
    }
  }, [data, fetchError]);

  const signupData = { handleChange, values, error };
  return (
    <div className="flex items-center bg-gray-100 justify-center w-full h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 text-white rounded-md min-h-max w-4/5 shadow-2xl md:w-2/5"
      >
        <Logo />
        <div
          className="flex flex-col items-left justify-center
         bg-gray-800 text-white px-10 text-sm h-4/5 rounded-md"
        >
          <div className="text-center">
            <h2 className="mb-6 text-lg font-bold">Sign-up Now</h2>
            <p className="mb-4">
              Please fill the form below to become a member and have access to
              our services
            </p>
          </div>
          {isLoading && <h2 className="text-center mt-10">Loading...</h2>}
          {Object.keys(fetchError).length !== 0 && (
            <h2 className="mt-3 font-bold text-red-500">
              {fetchError.errMessage}
            </h2>
          )}
          <div className="">
            <SignupComponent
              signupData={signupData}
              formData={['text', 'Full Name', 'name']}
            />
            <SignupComponent
              signupData={signupData}
              formData={['text', 'Username', 'username']}
            />
            <SignupComponent
              signupData={signupData}
              formData={['text', 'Email', 'email']}
            />
            <SignupComponent
              signupData={signupData}
              formData={['password', 'Password', 'password']}
            />
            <SignupComponent
              signupData={signupData}
              formData={['password', 'Confirm Password', 'password2']}
            />
          </div>
          <input
            type="submit"
            className="mb-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-900"
            id="submitBtn"
            value="Signup"
          />
          <p className="mb-6 text-center">
            Already a member?{' '}
            <Link
              to="/login"
              className="text-blue-400 underline hover:text-green-300"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
