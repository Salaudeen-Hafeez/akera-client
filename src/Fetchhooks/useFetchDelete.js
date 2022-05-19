import { useState, useEffect, useMemo } from 'react';

const useFetchDelete = (url, values) => {
  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const admin = JSON.parse(localStorage.getItem('admin'));
  let token;
  if (admin) {
    token = admin.admin_token;
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
    const abortConst = new AbortController();
    if (Object.keys(url).length !== 0) {
      setIsLoading(true);
      fetch(url, {
        signal: abortConst.signal,
        method: 'DELETE',
        headers: myHeaders,
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          if (!data.errMessage) {
            setFetchError({});
            setIsLoading(false);
            setData(data);
          } else {
            setData(null);
            setFetchError(data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setData({});
          setFetchError(err);
        });
    }

    return () => {
      abortConst.abort();
    };
  }, [url, values, myHeaders]);
  return { data, fetchError, isLoading };
};

export default useFetchDelete;
