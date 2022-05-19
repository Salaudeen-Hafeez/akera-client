import { useState, useEffect } from 'react';

const useFetchGet = (url, values) => {
  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const admin = JSON.parse(localStorage.getItem('admin'));
  const user = JSON.parse(localStorage.getItem('user'));
  let token;
  if (admin) {
    token = admin.admin_token;
  } else if (user) {
    token = user.auth_token;
  }

  const getHeaders = (token) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);
    return myHeaders;
  };

  const myHeaders = useMemo(() => {
    getHeaders(token);
  }, [token]);

  useEffect(() => {
    if (url !== '') {
      setIsLoading(true);

      fetch(url, { method: 'GET', headers: myHeaders })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          if (!data.errMessage) {
            setFetchError({});
            setData(data);
            setIsLoading(false);
          } else {
            setData(null);
            setFetchError(data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setData({});
          setFetchError(err);
          setIsLoading(false);
        });
    }
  }, [url, values]);
  return { data, fetchError, isLoading };
};

export default useFetchGet;
