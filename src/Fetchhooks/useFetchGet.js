import { useState, useEffect } from 'react';

const useFetchGet = (url, values) => {
  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (url !== '') {
      setIsLoading(true);

      fetch(url)
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
