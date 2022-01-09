const UserPackages = ({ packages, handlePackage }) => {
  return (
    <div
      className="w-10/12 cursor-pointer"
      onClick={handlePackage}
      id={packages.parcel_id}
      value={packages.parcel_id}
    >
      <h2 className="font-bold ">{packages._name}</h2>
      <p>{packages._username}</p>
      <p>{packages._location}</p>
      <p className="text-blue-700 underline ">{packages._status}</p>
    </div>
  );
};

export default UserPackages;
