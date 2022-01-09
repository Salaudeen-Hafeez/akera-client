import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchGet from '../Fetchhooks/useFetchGet';
import AppMap from '../Map';
import ChangeDestination from '../Postpackage/Changedestination';
import Button from './Button';
import DisplayPackage from './Displaypackage';
import useDestinationForm from '../Postpackage/useDestinationForm';
import validateForm from '../Universal/ValidateForm';

const PackageDetail = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState(
    JSON.parse(sessionStorage.getItem('selectedPackage'))
  );

  const [geoCode1Url, setGeoCode1Url] = useState(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${packages._location}&key=AIzaSyD9LtzkCH903RTWTMDehYnSmOVitAhBtwA`
  );
  const [geoCode2Url, setGeoCode2Url] = useState(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${packages._destination}&key=AIzaSyD9LtzkCH903RTWTMDehYnSmOVitAhBtwA`
  );
  const {
    user,
    data,
    error,
    values,
    isLoading,
    fetchError,
    handleSubmit,
    handleCancelButton,
    handleSelectChange,
  } = useDestinationForm(validateForm);

  let location = {};
  let destination = {};
  const geoCode1 = useFetchGet(geoCode1Url);
  const geoCode2 = useFetchGet(geoCode2Url);
  if (geoCode1.data !== null && geoCode2.data !== null) {
    if (geoCode1.data.status === 'OK' && geoCode2.data.status === 'OK') {
      location = geoCode1.data.results[0].geometry.location;
      destination = geoCode2.data.results[0].geometry.location;
    }
  }

  useEffect(() => {
    if (data !== null) {
      sessionStorage.setItem('selectedPackage', JSON.stringify(data));
      setPackages(data);

      setGeoCode1Url(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${data._location}&key=AIzaSyD9LtzkCH903RTWTMDehYnSmOVitAhBtwA`
      );
      setGeoCode2Url(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${data._destination}&key=AIzaSyD9LtzkCH903RTWTMDehYnSmOVitAhBtwA`
      );
    }
  }, [data]);

  const handleOkayButton = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const usePackageFormData = {
    handleSelectChange,
    handleSubmit,
    fetchError,
    isLoading,
    values,
    error,
  };
  return (
    <div className="">
      <div className="flex justify-center items-center w-full md:items-center bg-gray-200">
        <div className="md:w-3/5">
          <h2 className="text-center font-bold py-3">Package details</h2>
          <DisplayPackage />
          <Button
            handleOkayButton={handleOkayButton}
            handleCancelButton={handleCancelButton}
          />
          <AppMap location={location} destination={destination} />
          {isLoading && (
            <h2 className="font-bold mt-3 text-center">
              updating destination...
            </h2>
          )}

          <div className="flex flex-col w-11/12 mb-3">
            <ChangeDestination data={usePackageFormData} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
