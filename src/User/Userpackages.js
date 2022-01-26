const UserPackages = ({ packages, handlePackage }) => {
  return (
    <div
      className="w-full cursor-pointer"
      onClick={handlePackage}
      id={packages.parcel_id}
      value={packages.parcel_id}
    >
      <h2 className="font-bold ">{packages._name}</h2>
      <p>{packages._username}</p>
      <p>{packages._location}</p>
      <p className="text-blue-700 underline ">{packages._status}</p>
      <p className="w-full text-right font-sans font-bold text-purple-800 text-xl">
        {packages._cost}
      </p>
    </div>
  );
};

export default UserPackages;
