import { useState } from 'react';

const useLoginForm = (validate) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
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
export default useLoginForm;
