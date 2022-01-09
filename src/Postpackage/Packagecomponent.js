const PackageComponent = ({ data, label, inputName }) => {
  const { values, handleChange, error } = data;
  return (
    <div className="flex flex-col mb-4">
      <label className="pb-1">{label}</label>
      <input
        type={'text'}
        name={inputName}
        className="bg-gray-600 focus:bg-gray-800 h-6 hover:bg-gray-900"
        value={values[inputName]}
        onChange={handleChange}
      />
      <small className="text-red-600 font-bold brightness-105">
        {error[inputName]}
      </small>
    </div>
  );
};

export default PackageComponent;
