import { useState, useEffect, useMemo } from 'react';

const useFetchPost = (url, values) => {
  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  console.log(values);
  console.log(url);

  const user = JSON.parse(localStorage.getItem('user'));
  let token;
  if (user) {
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
    //const abortConst = new AbortController();
    if (url !== '') {
      setIsLoading(true);
      fetch(url, {
        // signal: abortConst.signal,
        method: 'POST',
        headers: myHeaders,
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
  }, [url, values, myHeaders]);
  console.log(data);
  return { data, fetchError, isLoading };
};

export default useFetchPost;
