import { useState, useEffect } from 'react';

const useFetchPost = (url, values) => {
  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  let token;
  if (user) {
    token = user.auth_token;
  }

  useEffect(() => {
    //const abortConst = new AbortController();
    if (url !== '') {
      setIsLoading(true);
      fetch(url, {
        // signal: abortConst.signal,
        method: 'POST',
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
          setData(null);
          setFetchError(err);
          setIsLoading(false);
        });
    }

    // return () => {
    //   abortConst.abort();
    // };
  }, [url, values, token]);
  return { data, fetchError, isLoading };
};

export default useFetchPost;
