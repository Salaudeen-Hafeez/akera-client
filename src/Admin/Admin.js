import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchDelete from '../Fetchhooks/useFetchDelete';
import { authContext } from '../useAuth';
import AdminComponent from './Admincomponent';

const Admin = () => {
  const context = useContext(authContext);
  const { distanceMetrix } = context;
  const [users, setUsers] = useState({});
  const [packages, setPackages] = useState(
    JSON.parse(localStorage.getItem('packages'))
  );
  const [packages1, setPackages1] = useState(null);
  const [deleteUrl, setDeleteUrl] = useState('');
  const [usersDataReady, setUsersDataReady] = useState(false);
  const [packageDataReady, setpackageDataReady] = useState(false);
  const [toggleUsers, setToggleUsers] = useState(false);
  const [togglePackages, setTogglePackages] = useState(false);
  const navigate = useNavigate();

  const { data } = useFetchDelete(deleteUrl);
  const admin = JSON.parse(localStorage.getItem('admin'));
  const { admin_token, _email } = admin;
  useEffect(() => {
    if (data !== null && Object.keys(data).length !== 0) {
      if (data.users) {
        setUsers(data.users);
        localStorage.setItem('users', JSON.stringify(data.users));
        setDeleteUrl('');
      } else if (data.package) {
        localStorage.setItem('packages', JSON.stringify(data.packages));
        const package1 = data.packages.filter(
          (packag) => packag._status === data.package._status
        );
        setPackages1(package1);
        setPackages(data.packages);
        setDeleteUrl('');
      }
    }
  }, [data]);
  const handleUser = () => {
    if (!admin_token) {
      navigate('/login');
    } else {
      setUsers(JSON.parse(localStorage.getItem('users')));
      setToggleUsers(!toggleUsers);
      setUsersDataReady(true);
      setpackageDataReady(false);
    }
  };
  const handleNewPackage = () => {
    if (!admin_token) {
      navigate('/login');
    } else {
      const package1 = packages.filter(
        (packag) => packag._status === 'Ready for pickup'
      );
      setPackages1(package1);
      setTogglePackages(!togglePackages);
      setUsersDataReady(false);
      setpackageDataReady(true);
    }
  };
  const handleCanceledPackage = () => {
    if (!admin_token) {
      navigate('/login');
    } else {
      const package1 = packages.filter(
        (packag) => packag._status === 'Order Canceled'
      );
      setPackages1(package1);
      setTogglePackages(!togglePackages);
      setUsersDataReady(false);
      setpackageDataReady(true);
    }
  };
  const handlePackageInTransit = () => {
    if (!admin_token) {
      navigate('/login');
    } else {
      const package1 = packages.filter(
        (packag) => packag._status === 'In transit'
      );
      setPackages1(package1);
      setTogglePackages(!togglePackages);
      setUsersDataReady(false);
      setpackageDataReady(true);
    }
  };
  const handleDeliveredPackage = () => {
    if (!admin_token) {
      navigate('/login');
    } else {
      const package1 = packages.filter(
        (packag) => packag._status === 'Delivered'
      );
      setPackages1(package1);
      setTogglePackages(!togglePackages);
      setUsersDataReady(false);
      setpackageDataReady(true);
    }
  };
  const handleSelectedPackage = (e) => {
    e.preventDefault();
    if (e.target.localName !== 'button') {
      const packageId = parseInt(e.target.parentElement.id);
      const selectedPackage = packages.filter(
        (data) => data.parcel_id === packageId
      );
      localStorage.setItem(
        'selectedPackage',
        JSON.stringify(selectedPackage[0])
      );
      distanceMetrix().then(() => {
        navigate('/packagepage');
      });
    }
  };
  const handleDelete = (e) => {
    e.preventDefault();
    const id = e.target.id;
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
    const id = e.target.id;
    const username = e.target.name;
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
      <AdminComponent data={admin} adminEvents={adminEvents} />
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
                  onClick={handleSelectedUser}
                  className="bg-mainbg p-3 rounded-lg 
                  cursor-pointer shadow-inner hover:shadow-md"
                >
                  <h2 className="font-bold ">{user._name}</h2>
                  <p>{user._email}</p>
                  <p>{user._username}</p>
                  <div className="flex items-end justify-between pt-2">
                    <p className="text-blue-700 underline cursor-pointer">
                      {user._status}
                    </p>
                    <button
                      className="text-right pr-3 text-red-400"
                      id={user.users_id}
                      name={user._username}
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
        {packageDataReady && packages1 !== null && (
          <div
            className="md:grid md:grid-cols-3 md:grid-flow-rows 
          md:gap-3 list-none"
          >
            {packages1.length === 0 && (
              <h2 className="font-bold text-xl text-red-500 text-center">
                No packages
              </h2>
            )}
            {packages1.map((packag) => {
              return (
                <div
                  key={packag.parcel_id}
                  id={packag.parcel_id}
                  onClick={handleSelectedPackage}
                  className="bg-mainbg p-3 rounded-lg 
                   shadow-inner hover:shadow-md"
                >
                  <h2 className="font-bold ">{packag._name}</h2>
                  <p>{packag._username}</p>
                  <p>{packag._location}</p>
                  <div className="flex items-end justify-between pt-2">
                    <p className="text-blue-700 underline cursor-pointer">
                      {packag._status}
                    </p>
                    <button
                      className="text-right p-3 text-red-400"
                      onClick={handleDelete}
                      name={packag._username}
                      value={packag._status}
                      id={packag.parcel_id}
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
