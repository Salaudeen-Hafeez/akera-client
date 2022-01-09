const SignupComponent = ({ signupData, formData }) => {
  const { handleChange, values, error } = signupData;
  let name = formData[2];
  return (
    <div className="flex flex-col mb-4">
      <label className="pb-1">{formData[1]}</label>
      <input
        type={formData[0]}
        name={formData[2]}
        className="bg-gray-700 focus:bg-gray-800 h-6 hover:bg-gray-900"
        value={values[name]}
        onChange={handleChange}
      />
      <small className="text-red-600 font-bold brightness-105">
        {error[name]}
      </small>
    </div>
  );
};

export default SignupComponent;
