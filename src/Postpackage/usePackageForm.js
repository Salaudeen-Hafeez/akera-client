import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchPost from '../Fetchhooks/useFetchPost';

const usePackageForm = (validate) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { _username, _email, auth_token } = user;
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [url, setUrl] = useState('');
  const [values, setValues] = useState({
    name: '',
    location: '',
    destination: '',
    sender: '',
    reciever: '',
    frajile: '',
    username: _username,
  });
  const uri = `https://akera-logistics.herokuapp.com/api/v1/users/${_username}/${_email}/${auth_token}/packages`;
  const toNaira = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  });
  const cost = (dist, dur) => {
    let multiplier;
    switch (dist) {
      case dist <= 10000:
        multiplier = 400;
        break;
      case 10000 <= dist <= 30000:
        multiplier = 250;
        break;
      case 30000 <= dist <= 70000:
        multiplier = 190;
        break;
      case 70000 <= dist <= 1200000:
        multiplier = 120;
        break;
      case 1200000 <= dist <= 250000:
        multiplier = 60;
        break;
      default:
        multiplier = 40;
        break;
    }
    const totalcost = ((dist + dur) / 1000) * multiplier;
    const naira = toNaira.format(Math.round(totalcost));
    return naira;
  };
  const distanceMetrix = async (packages) => {
    const service = new window.google.maps.DistanceMatrixService();
    let tripFare = null;
    let notFound = null;
    const request = {
      origins: [packages.location],
      destinations: [packages.destination],
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };
    // get distance matrix response
    let distMetrix = await service
      .getDistanceMatrix(request)
      .then((response) => {
        return response;
      });
    const { distance, duration, status } = distMetrix.rows[0].elements[0];
    if (status === 'OK') {
      tripFare = cost(distance.value, duration.value);
    } else {
      notFound = { errMessage: 'Address entered not found' };
    }
    return { tripFare, notFound };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'frajile') {
      if (e.target.checked) {
        setValues({
          ...values,
          [name]: 'package is frajile',
        });
      } else {
        setValues({
          ...values,
          [name]: 'package not frajile',
        });
      }
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(values);
    if (Object.keys(errors).length === 0) {
      const { tripFare, notFound } = await distanceMetrix(values);
      if (tripFare !== null) {
        values['cost'] = tripFare;
        setError(errors);
        setUrl(uri);
      } else {
        setError(notFound);
        setUrl('');
      }
    } else {
      setError(errors);
      setUrl('');
    }
  };
  const { data, fetchError, isLoading } = useFetchPost(url, values, _username);
  // const postdata = (data) => {
  //   return new Promise((res) => {
  //     localStorage.setItem('selectedPackage', JSON.stringify(data.package));
  //     localStorage.setItem('packages', JSON.stringify(data.packages));
  //     res();
  //   });
  // };
  useEffect(() => {
    if (data !== null) {
      // postdata(data).then(() => {
      localStorage.setItem('selectedPackage', JSON.stringify(data.package));
      localStorage.setItem('packages', JSON.stringify(data.packages));
      navigate('/packagepage');
      // });
    }
  }, [data, navigate]);

  return {
    handleChange,
    handleSubmit,
    isLoading,
    fetchError,
    values,
    error,
  };
};

export default usePackageForm;
