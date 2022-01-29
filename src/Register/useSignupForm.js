import { useState } from 'react';

const useSignupForm = () => {
  const [values, setValues] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return { handleChange, values };
};

export default useSignupForm;
