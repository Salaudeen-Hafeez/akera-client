import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchDelete from '../Fetchhooks/useFetchDelete';
import useFetchGet from '../Fetchhooks/useFetchGet';
import AdminComponent from './Admincomponent';

const Admin = () => {
  const [url, setUrl] = useState('');
  const [users, setUsers] = useState(null);
  const [packages, setPackages] = useState(null);
  const [deleteUrl, setDeleteUrl] = useState('');
  const [usersDataReady, setUsersDataReady] = useState(false);
  const [packageDataReady, setpackageDataReady] = useState(false);
  const [toggleUsers, setToggleUsers] = useState(false);
  const [togglePackages, setTogglePackages] = useState(false);
  const navigate = useNavigate();

  const { data: data1, fetchError, isLoading } = useFetchGet(url);
  const { data: data2 } = useFetchDelete(deleteUrl);

  const adminData = JSON.parse(sessionStorage.getItem('adminData'));
  const { admin_token, _email } = adminData.admin;

  useEffect(() => {
    if (Array.isArray(data1) && data1.length) {
      if ('users_id' in data1[0]) {
        setUsers(data1);
        setpackageDataReady(false);
        setUsersDataReady(true);
        setUrl('');
      } else if ('parcel_id' in data1[0]) {
        setPackages(data1);
        sessionStorage.setItem('usersPackage', JSON.stringify(data1));
        setUsersDataReady(false);
        setpackageDataReady(true);
        setUrl('');
      }
    }
  }, [data1]);

  useEffect(() => {
    if (Array.isArray(data2) && data2.length) {
      if ('users_id' in data2[0]) {
        setUsers(data2);
        setDeleteUrl('');
      } else if ('parcel_id' in data2[0]) {
        setPackages(data2);
        setDeleteUrl('');
      }
    }
  }, [data2]);

  const handleUser = () => {
    if (!admin_token) {
      navigate('/login');
    } else {
      setUrl(
        `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${admin_token}`
      );
      setToggleUsers(!toggleUsers);
      setUsersDataReady(true);
      setpackageDataReady(false);
    }
  };

  const handleNewPackage = () => {
    if (!admin_token) {
      navigate('/login');
    } else {
      const condition = 'At the location';
      setUrl(
        `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${admin_token}/packages/${condition}`
      );
      setTogglePackages(!togglePackages);
      setUsersDataReady(false);
      setpackageDataReady(true);
    }
  };

  const handleCanceledPackage = () => {
    if (!admin_token) {
      navigate('/login');
    } else {
      const condition = 'Order Canceled';
      setUrl(
        `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${admin_token}/packages/${condition}`
      );
      setTogglePackages(!togglePackages);
      setUsersDataReady(false);
      setpackageDataReady(true);
    }
  };
  const handlePackageInTransit = () => {
    if (!admin_token) {
      navigate('/login');
    } else {
      const condition = 'In transit';
      setUrl(
        `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${admin_token}/packages/${condition}`
      );
      setTogglePackages(!togglePackages);
      setUsersDataReady(false);
    }
  };

  const handleDeliveredPackage = () => {
    if (!admin_token) {
      navigate('/login');
    } else {
      const condition = 'Delivered';
      setUrl(
        `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${admin_token}/packages/${condition}`
      );
      setTogglePackages(!togglePackages);
      setUsersDataReady(false);
    }
  };
  const handleSelectedPackage = (e) => {
    const packageId = parseInt(e.target.parentElement.parentElement.id);
    const selectedPackage = packages.filter(
      (data) => data.parcel_id === packageId
    );
    sessionStorage.setItem(
      'selectedPackage',
      JSON.stringify(selectedPackage[0])
    );
    navigate('/packagepage');
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const id = e.target.parentElement.parentElement.id;
    const username = e.target.parentElement.parentElement.children[1].innerText;
    const status = e.target.parentElement.children[0].innerText;
    setDeleteUrl(
      `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${admin_token}/${username}/packages/${id}/${status}`
    );
  };

  const handleSelectedUser = (e) => {
    e.preventDefault();
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    const id = e.target.parentElement.parentElement.id;
    const username = e.target.parentElement.parentElement.children[2].innerText;
    setDeleteUrl(
      `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${admin_token}/${username}/${id}`
    );
  };

  const adminEvents = {
    handleUser,
    handleNewPackage,
    handlePackageInTransit,
    handleDeliveredPackage,
    handleCanceledPackage,
  };

  return (
    <div className="bg-gray-200 bg-opacity-15">
      <AdminComponent data={adminData.admin} adminEvents={adminEvents} />
      <div className="md:w-full md:flex md:justify-center">
        {usersDataReady && users !== null && (
          <div
            className="md:grid md:grid-cols-3 md:grid-flow-rows 
          md:gap-3 list-none"
          >
            {users.map((user) => {
              return (
                <div
                  id={user.users_id}
                  key={user.users_id}
                  className="bg-mainbg p-3 rounded-lg 
                  cursor-pointer shadow-inner hover:shadow-md"
                >
                  <h2 className="font-bold ">{user._name}</h2>
                  <p>{user._email}</p>
                  <p>{user._username}</p>
                  <div className="flex items-end justify-between pt-2">
                    <p
                      className="text-blue-700 underline cursor-pointer"
                      onClick={handleSelectedUser}
                    >
                      {user._status}
                    </p>
                    <button
                      className="text-right pr-3 text-red-400"
                      onClick={handleDeleteUser}
                    >
                      delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {isLoading && <h2 className="text-center mt-10">Loading...</h2>}
        {Object.keys(fetchError).length !== 0 && (
          <h2 className="mt-3 font-bold text-red-500 text-center">
            {fetchError.errMessage}
          </h2>
        )}
        {packageDataReady && packages !== null && (
          <div
            className="md:grid md:grid-cols-3 md:grid-flow-rows 
          md:gap-3 list-none"
          >
            {packages.map((packag) => {
              return (
                <div
                  key={packag.parcel_id}
                  id={packag.parcel_id}
                  value={packag.parcel_id}
                  className="bg-mainbg p-3 rounded-lg 
                   shadow-inner hover:shadow-md"
                >
                  <h2 className="font-bold ">{packag._name}</h2>
                  <p>{packag._username}</p>
                  <p>{packag._location}</p>
                  <div className="flex items-end justify-between pt-2">
                    <p
                      className="text-blue-700 underline cursor-pointer"
                      onClick={handleSelectedPackage}
                    >
                      {packag._status}
                    </p>
                    <button
                      className="text-right pr-3 text-red-400"
                      onClick={handleDelete}
                    >
                      delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
