import { useState, useEffect } from 'react';

const useInterceptor = (axios) => {
  const [error, setError] = useState(null);

  // called before render phase similar to componentWillMount
  const request = axios.interceptors.request.use(
    (req) => {
      setError(null);
      return req;
    },
    (err) => {
      console.error(err);
    }
  );
  const response = axios.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
      console.error(err, 'response error');
    }
  );
  // cleanup on unmount
  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(request);
      axios.interceptors.response.eject(response);
    };
  }, [axios, request, response]);

  const closeErrorHandler = () => {
    setError(null);
  };

  return [error, closeErrorHandler];
};

export default useInterceptor;
