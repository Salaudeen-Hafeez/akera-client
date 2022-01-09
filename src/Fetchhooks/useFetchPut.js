import { useState, useEffect } from 'react';

const useFetchPut = (url, values) => {
  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // const abortConst = new AbortController();
    if (url !== '') {
      setIsLoading(true);
      fetch(url, {
        // signal: abortConst.signal,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
  }, [url, values]);
  return { data, fetchError, isLoading };
};

export default useFetchPut;
