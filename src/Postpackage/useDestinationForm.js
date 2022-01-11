import { useState } from 'react';
import useFetchPut from '../Fetchhooks/useFetchPut';

const useDestinationForm = (validate) => {
  const [error, setError] = useState({});
  const [url, setUrl] = useState('');
  const packages = JSON.parse(sessionStorage.getItem('selectedPackage'));
  let token = '';
  let name;
  const user =
    JSON.parse(sessionStorage.getItem('userData')) ||
    JSON.parse(sessionStorage.getItem('adminData'));

  if (user.admin) {
    token = user.admin.admin_token;
    name = '_location';
  } else {
    token = user.user.auth_token;
    name = '_destination';
  }
  const { _email, users_id } = user.user || user.admin;
  const [values, setValues] = useState({ [name]: '' });
  const handleSelectChange = (e) => {
    console.log(e);
    setUrl('');
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const uri = `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${users_id}/${token}/packages/${parseInt(
    packages.parcel_id
  )}`;
  const { data, fetchError, isLoading } = useFetchPut(url, values);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl('');
    if (packages._status === 'Order Canceled') {
      alert('Order has been canceled');
    } else {
      const errors = validate(values);
      if (Object.keys(errors).length === 0) {
        setError(errors);
        setValues({ ...values, [e.target.name]: e.target.value });
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
