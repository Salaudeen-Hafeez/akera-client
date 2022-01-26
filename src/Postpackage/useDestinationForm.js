import { useEffect, useState } from 'react';
import useFetchPut from '../Fetchhooks/useFetchPut';

const useDestinationForm = (validate) => {
  const [error, setError] = useState({});
  const [url, setUrl] = useState('');
  const packages = JSON.parse(localStorage.getItem('selectedPackage'));
  let token = '';
  let name, email, userId;
  const user =
    JSON.parse(localStorage.getItem('user')) ||
    JSON.parse(localStorage.getItem('admin'));
  if (user !== null) {
    email = user._email;
    userId = user.users_id;
    if (user.admin_token) {
      token = user.admin_token;
      name = '_location';
    } else {
      token = user.auth_token;
      name = '_destination';
    }
  }

  const [values, setValues] = useState({ [name]: '' });
  const handleSelectChange = (e) => {
    setUrl('');
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const uri = `https://akera-logistics.herokuapp.com/api/v1/users/${email}/${userId}/${token}/packages/${parseInt(
    packages.parcel_id
  )}`;
  const { data, fetchError, isLoading } = useFetchPut(url, values);
  useEffect(() => {
    setUrl('');
  }, [data]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl('');
    if (packages._status === 'Order Canceled') {
      alert('Order has been canceled');
    } else {
      const errors = validate(values);
      if (Object.keys(errors).length === 0) {
        setError(errors);
        setUrl(uri);
      } else {
        setError(errors);
        setUrl('');
      }
    }
  };
  const handleCancelButton = (e) => {
    e.preventDefault();
    if (packages._status === 'Order Canceled') {
      alert('Order has been canceled');
    } else {
      const data = { _status: 'Order Canceled' };
      setValues(data);
      setUrl(uri);
    }
  };
  return {
    handleSelectChange,
    handleSubmit,
    handleCancelButton,
    isLoading,
    fetchError,
    values,
    error,
    data,
    user,
  };
};

export default useDestinationForm;
