import { useState } from 'react';

const AdminComponent = ({ data, adminEvents }) => {
  const [showPackage, setShowPackage] = useState(false);
  const {
    handleUser,
    handleNewPackage,
    handlePackageInTransit,
    handleDeliveredPackage,
    handleCanceledPackage,
  } = adminEvents;

  const handlePackage = () => {
    setShowPackage(!showPackage);
  };
  return (
    <div>
      <div
        className="flex flex-col bg-userbg w-full 
          items-center py-6 shadow-lg"
      >
        <img
          src="/images/Lagos4.jpg"
          alt="profilepicture"
          className="w-2/5 h-24 rounded-lg mb-4 md:w-1/5"
        />
        <div className="text-center">
          <h1 className="text-lg font-bold">{data._name}</h1>
          <ul>
            <li>{data._username}</li>
            <li>{data._email}</li>
            <li className="text-green-500">{data._status}</li>
          </ul>
        </div>
      </div>
      <div className="md:flex md:justify-center md:flex-col md:items-center md:w-full bg-gray-200">
        <div className="text-blue-500 my-2">
          <button className="ml-2" onClick={handleUser}>
            Users
          </button>
          <button className="ml-2" onClick={handlePackage}>
            Packages
          </button>
        </div>
        {showPackage && (
          <div className="mt-2 ml-2 flex flex-col md:flex-row md:w-4/5 md:justify-between">
            <button
              className="py-3 mb-2 bg-btnbg mx-2 rounded-lg hover:bg-purple-500 hover:text-white md:w-full"
              onClick={handleNewPackage}
            >
              New packages
            </button>
            <button
              className="py-3 mb-2 bg-btnbg mx-2 rounded-lg hover:bg-purple-500 hover:text-white md:w-full"
              onClick={handlePackageInTransit}
            >
              Packages in transit
            </button>
            <button
              className="py-3 mb-2 bg-btnbg mx-2 rounded-lg hover:bg-purple-500 hover:text-white md:w-full"
              onClick={handleDeliveredPackage}
            >
              Delivered packages
            </button>
            <button
              className="py-3 mb-2 bg-btnbg mx-2 rounded-lg hover:bg-purple-500 hover:text-white md:w-full"
              onClick={handleCanceledPackage}
            >
              Canceled packages
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminComponent;
