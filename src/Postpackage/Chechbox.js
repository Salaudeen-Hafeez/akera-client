const CheckboxComponent = ({ data, inputName }) => {
  const { values, handleChange } = data;

  return (
    <div className="flex pb-2">
      <input
        type={'checkbox'}
        name={inputName}
        value={values[inputName]}
        onChange={handleChange}
        className="mt-1 mr-2"
      />
      <label className="pb-1">is the package frajile?</label>
    </div>
  );
};

export default CheckboxComponent;
