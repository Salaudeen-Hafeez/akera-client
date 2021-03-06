import { useEffect, useState } from 'react';
import useFetchPut from '../Fetchhooks/useFetchPut';

const useDestinationForm = (validate) => {
  const [error, setError] = useState({});
  const [url, setUrl] = useState('');
  const packages = JSON.parse(localStorage.getItem('selectedPackage'));
  let name;
  const user =
    JSON.parse(localStorage.getItem('user')) ||
    JSON.parse(localStorage.getItem('admin'));
  if (user !== null) {
    if (user.admin_token) {
      name = '_location';
    } else {
      name = '_destination';
    }
  }

  const [values, setValues] = useState({ [name]: '' });
  const handleSelectChange = (e) => {
    setUrl('');
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const id = parseInt(packages.parcel_id);
  const uri = `https://akera-logistics.herokuapp.com/api/v1/parcels/${id}/destination`;
  const uri1 = `https://akera-logistics.herokuapp.com/api/v1/parcels/${id}/status`;
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
        if (Object.keys(values).length === 1) {
          setUrl(uri);
        } else {
          setUrl(uri1);
        }
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
