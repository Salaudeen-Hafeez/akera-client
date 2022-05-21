import { useState, useEffect } from 'react';

const useFetchDelete = (url, values) => {
  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const admin = JSON.parse(localStorage.getItem('admin'));
  let token;
  if (admin) {
    token = admin.admin_token;
  }

  useEffect(() => {
    const abortConst = new AbortController();
    if (Object.keys(url).length !== 0) {
      setIsLoading(true);
      fetch(url, {
        signal: abortConst.signal,
        method: 'DELETE',
        headers: new Headers({
          Authorization: token,
          'Content-Type': 'application/json',
        }),
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
  }, [url, values, token]);
  return { data, fetchError, isLoading };
};

export default useFetchDelete;
