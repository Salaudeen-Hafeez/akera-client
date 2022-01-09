const DisplayPackage = () => {
  const packages = JSON.parse(sessionStorage.getItem('selectedPackage'));

  return (
    <div className="bg-packagebg bg-opacity-40 shadow-lg p-2 rounded">
      <div className="flex flex-col items-center my-4">
        <img
          src="/images/Lagos4.jpg"
          alt="profilepicture"
          className="w-10/12 mb-2 rounded"
        />

        <table className="border-2 border-gray-400 w-11/12">
          <thead>
            <tr className="border-2 border-gray-400 text-center">
              <th colSpan="2">{packages._name}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-2 border-gray-400 text-center">
              <td className="border-2 border-gray-400">location</td>
              <td className="border-2 border-gray-400">{packages._location}</td>
            </tr>
            <tr className="border-2 border-gray-400 text-center">
              <td className="border-2 border-gray-400">Destination</td>
              <td>{packages._destination}</td>
            </tr>
            <tr className="border-2 border-gray-400 text-center">
              <td className="border-2 border-gray-400">Reciever</td>
              <td>{packages._reciever}</td>
            </tr>
            <tr className="text-center">
              <td colSpan="2" className="td-status">
                <button>{packages._status}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayPackage;
