import PlacesAutocomplete from 'react-places-autocomplete';
import { useState } from 'react';

const PlaceAutocomplete = (props) => {
  const [address, setAddress] = useState('');
  const handleChange = (address) => {
    setAddress(address);
    props.data.values[props.inputName] = address;
  };
  return (
    <PlacesAutocomplete value={address} onChange={handleChange}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="flex flex-col mb-4">
          <label>{props.label}</label>
          <input
            {...getInputProps({
              placeholder: `Search for the address ...`,
              className: 'location-search-input',
            })}
            className="bg-gray-600 text-white focus:bg-gray-800 h-6 hover:bg-gray-900"
          />
          <small className="text-red-600 font-bold brightness-105">
            {props.data.error[props.inputName] &&
              `${props.data.error[props.inputName]}`}
          </small>
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? {
                    backgroundColor: '#5c5c5b',
                    cursor: 'pointer',
                    color: 'white',
                  }
                : {
                    backgroundColor: 'gray',
                    color: 'white',
                    cursor: 'pointer',
                  };
              return (
                <div
                  key={suggestion.placeId}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default PlaceAutocomplete;
