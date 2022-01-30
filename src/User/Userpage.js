import { useContext, useState } from 'react';
import UserPackages from './Userpackages';
import Navbar from '../Universal/Navbar';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../useAuth';

const UserPage = () => {
  const context = useContext(authContext);
  const { distanceMetrix } = context;
  const user = JSON.parse(localStorage.getItem('user'));
  const packages = JSON.parse(localStorage.getItem('packages'));
  const [packageData, setPackageData] = useState({});
  const navigate = useNavigate();
  const linkItems = ['logout'];
  const handleClick = () => {
    if (!('auth_token' in user)) {
      navigate('/login');
    } else {
      setPackageData(packages);
    }
  };
  const handlePendingPackage = () => {
    if (!('auth_token' in user)) {
      navigate('/login');
    } else {
      const package1 = packages.filter(
        (packag) => packag._status === 'In transit'
      );
      setPackageData(package1);
    }
  };
  const handlePackage = (e) => {
    const packageId = parseInt(e.target.parentElement.id);
    const selectedPackage = packages.filter(
      (data) => data.parcel_id === packageId
    );
    localStorage.setItem('selectedPackage', JSON.stringify(selectedPackage[0]));
    distanceMetrix().then(() => {
      navigate('/packagepage');
    });
  };

  const handleAddPackage = () => {
    if (!('auth_token' in user)) {
      navigate('/login');
    } else {
      navigate('/addpackage');
    }
  };
  return (
    <div>
      <Navbar linkItems={linkItems} />
      <div className="text-gray-900">
        {user && (
          <div className="flex items-center flex-col ">
            <div
              className="flex flex-col bg-userbg bg-transparent w-full 
          items-center py-6 shadow-2xl"
            >
              <img
                src="/images/Lagos4.jpg"
                alt="profilepicture"
                className="w-2/5 h-24 rounded-lg mb-4"
              />
              <div className="text-center">
                <h1 className="text-lg font-bold">{user._name}</h1>
                <ul>
                  <li id="username">{user._username}</li>
                  <li>{user._email}</li>
                  <li className="text-blue-600 font-bold">{user._status}</li>
                  <li
                    className=" 
              text-sm rounded-lg 
              cursor-pointer 
              hover:bg-gray-300 py-4"
                    onClick={handleClick}
                  >
                    <button>My packages</button>
                  </li>
                  <li
                    className=" 
              text-sm rounded-lg 
              cursor-pointer 
              hover:bg-gray-300 py-4"
                    onClick={handlePendingPackage}
                  >
                    <button>Pending packages</button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full p-3">
              {packageData.length === 0 && (
                <h2 className="font-bold text-xl text-red-500 mt-20px text-center">
                  No packages
                </h2>
              )}
              {Object.keys(packageData).length !== 0 && (
                <div className="md:flex md:flex-col md:justify-center md:items-center w-full bg-mainbg">
                  <h2 className="text-center text-gray-800 text-lg font-bold pt-4">
                    My packages
                  </h2>
                  <div
                    className="md:grid md:grid-cols-3 md:grid-flow-rows 
                    md:gap-3 list-none w-full"
                  >
                    {packageData.map((data) => (
                      <div
                        key={data.parcel_id}
                        className="bg-mainbg p-3 rounded-lg 
                   shadow-inner hover:shadow-md hover:bg-gray-100"
                      >
                        <UserPackages
                          packages={data}
                          handlePackage={handlePackage}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleAddPackage}
              className="my-4 py-1 bg-btnbg w-11/12 
            rounded-lg text-center"
            >
              Add new package
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
