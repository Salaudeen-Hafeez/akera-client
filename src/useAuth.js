import * as React from 'react';

export const authContext = React.createContext();

const useAuth = () => {
  const [userAuthed, setUserAuthed] = React.useState(
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
