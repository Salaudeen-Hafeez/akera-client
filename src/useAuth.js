import { useState, createContext } from 'react';

export const authContext = createContext();

const useAuth = () => {
  const [userAuthed, setUserAuthed] = useState(
    JSON.parse(sessionStorage.getItem('userData')) ||
      JSON.parse(sessionStorage.getItem('adminData'))
  );

  return {
    userAuthed,
    login() {
      return new Promise((res) => {
        setUserAuthed(
          JSON.parse(sessionStorage.getItem('userData')) ||
            JSON.parse(sessionStorage.getItem('adminData'))
        );
        res();
      });
    },
    signup() {
      return new Promise((res) => {
        setUserAuthed(
          JSON.parse(sessionStorage.getItem('userData')) ||
            JSON.parse(sessionStorage.getItem('adminData'))
        );
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setUserAuthed(
          JSON.parse(sessionStorage.getItem('userData')) ||
            JSON.parse(sessionStorage.getItem('adminData'))
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
