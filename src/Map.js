import GoogleMapReact from 'google-map-react';
import Marker from './User/Marker';

const AppMap = ({ location, destination }) => {
  return (
    <div className="w-full h-72">
      <GoogleMapReact
        center={{
          lat: location.lat,
          lng: location.lng,
        }}
        zoom={9}
      >
        <Marker
          lat={location.lat}
          lng={location.lng}
          image={'images/marker1.jpg'}
        />
        <Marker
          lat={destination.lat}
          lng={destination.lng}
          image={'images/marker1.jpg'}
        />
      </GoogleMapReact>
    </div>
  );
};

export default AppMap;
