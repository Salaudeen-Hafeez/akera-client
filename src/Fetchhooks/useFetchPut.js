import { useState, useEffect } from 'react';

const useFetchPut = (url, values) => {
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

  useEffect(() => {
    // const abortConst = new AbortController();
    if (url !== '') {
      setIsLoading(true);
      fetch(url, {
        // signal: abortConst.signal,
        method: 'PUT',
        headers: new Headers({
          Authorization: token,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(values),
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          if (!data.username) {
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
          setData(null);
          setFetchError(err);
          setIsLoading(false);
        });
    }

    return () => {
      // abortConst.abort();
    };
  }, [url, values, token]);
  return { data, fetchError, isLoading };
};

export default useFetchPut;
