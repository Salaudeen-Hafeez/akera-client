import { useState, createContext } from 'react';

export const authContext = createContext();
const useAuth = () => {
  const [userAuthed, setUserAuthed] = useState(
    JSON.parse(localStorage.getItem('user')) ||
      JSON.parse(localStorage.getItem('admin'))
  );

  return {
    userAuthed,
    login() {
      return new Promise((res) => {
        setUserAuthed(
          JSON.parse(localStorage.getItem('user')) ||
            JSON.parse(localStorage.getItem('admin'))
        );
        res();
      });
    },
    signup() {
      return new Promise((res) => {
        setUserAuthed(
          JSON.parse(localStorage.getItem('user')) ||
            JSON.parse(localStorage.getItem('admin'))
        );
        res();
      });
    },
    distanceMetrix() {
      return new Promise(async (res) => {
        const packages = JSON.parse(localStorage.getItem('selectedPackage'));
        const service = new window.google.maps.DistanceMatrixService();
        const add = [packages._location, packages._destination];
        const request = {
          origins: [add[0]],
          destinations: [add[1]],
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        };
        // get distance matrix response
        let distance = await service
          .getDistanceMatrix(request)
          .then((response) => {
            return response;
          });
        localStorage.setItem('distanceMetrix', JSON.stringify(distance));
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setUserAuthed(
          JSON.parse(localStorage.getItem('user')) ||
            JSON.parse(localStorage.getItem('admin'))
        );
        res();
      });
    },
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// export default function AuthConsumer() {
//   return React.useContext(authContext);
// }
