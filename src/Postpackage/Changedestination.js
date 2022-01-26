import PlaceAutocomplete from '../Placeautocomplete';

const ChangeDestination = ({ user, data }) => {
  const { handleSubmit, handleSelectChange } = data;
  let name;
  let label;
  let stat = 'status';
  let showStatusInput = true;
  if (user.admin_token) {
    label = 'New location';
    name = '_location';
  } else {
    showStatusInput = false;
    label = 'New destination';
    name = '_destination';
    stat = 'destination';
  }

  return (
    <div className="bg-transparent mt-3">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col items-center bg-purple-600 rounded-lg bg-opacity-25"
      >
        <h2 className="text-center m-3 font-bold">
          Fill the form below to change the order {stat}
        </h2>
        <div className="flex flex-col w-11/12 mb-3">
          <PlaceAutocomplete
            data={data}
            label={label}
            inputName={name}
            key={'location'}
          />
        </div>
        {showStatusInput && (
          <div className="flex flex-col w-11/12 mb-3">
            <label htmlFor="status">Package status</label>
            <select
              className="w-5/6"
              name="_status"
              id="status"
              onChange={handleSelectChange}
            >
              <option value="At the location">At the location</option>
              <option value="In transit">In transit</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        )}
        <div className="text-center text-white">
          <input
            type="submit"
            className="p-2 mb-4 rounded-lg bg-purple-600 hover:bg-purple-900"
            id="submitBtn"
            value={`Change ${stat}`}
          />
        </div>
      </form>
    </div>
  );
};

export default ChangeDestination;
