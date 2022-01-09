import { useState, useEffect } from 'react';

const useFetchDelete = (url, values) => {
  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const abortConst = new AbortController();
    if (Object.keys(url).length !== 0) {
      setIsLoading(true);
      fetch(url, {
        signal: abortConst.signal,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
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
  }, [url, values]);
  return { data, fetchError, isLoading };
};

export default useFetchDelete;
