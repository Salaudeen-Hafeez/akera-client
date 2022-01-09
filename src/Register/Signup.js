import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignupForm from './useSignupForm';
import useFetchPost from '../Fetchhooks/useFetchPost';
import validateForm from '../Universal/ValidateForm';
import SignupComponent from './SignupComponent';

const SignUp = () => {
  const [error, setError] = useState({});
  const [url, setUrl] = useState('');
  const navigate = useNavigate();
  const { handleChange, values } = useSignupForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(values);
    setError(errors);
    if (Object.keys(errors).length === 0) {
      if (values.email.includes('@sendit.com')) {
        setUrl('https://akera-logistics.herokuapp.com/api/v1/users/admins');
      } else {
        setUrl('https://akera-logistics.herokuapp.com/api/v1/users');
      }
    }
  };
  const { data, fetchError, isLoading } = useFetchPost(url, values);

  if (data !== null && Object.keys(error).length === 0) {
    sessionStorage.clear();
    if (values.email.includes('@sendit')) {
      sessionStorage.setItem('adminData', JSON.stringify(data));
      setTimeout(navigate('/adminpage'), 1200);
    } else {
      sessionStorage.setItem('userData', JSON.stringify(data));
      setTimeout(navigate('/userpage'), 1200);
    }
  }

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
        <a href="home.html" className="px-1 inline-flex items-center">
          <img src="images/logo2.png" alt="Logo" className="w-10 h-9 mr-2" />
          <span className="text-lg font-bold uppercase tracking-wide">
            Akera Logistics
          </span>
        </a>
        <div
          className="flex flex-col items-left justify-center
         bg-gray-800 text-white px-10 text-sm h-4/5 rounded-md"
        >
          {isLoading && <h2 className="text-center mt-10">Loading...</h2>}
          <div className="text-center">
            <h2 className="mb-6 text-lg font-bold">Sign-up Now</h2>
            <p className="mb-4">
              Please fill the form below to become a member and have access to
              our services
            </p>
          </div>
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
