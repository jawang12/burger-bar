import React, { useState, useEffect, useCallback } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => (props) => {
  const [error, setError] = useState(null);
  console.log('entered');
  // this will run similar to a componentWillMount
  // before the initial render and before the JSX code gets returned
  const request = useCallback(
    axios.interceptors.request.use(
      (req) => {
        // console.log('request from interceptor', request);
        console.log('run req');
        return req;
      },
      (err) => {
        console.error(err);
      }
    ),
    []
  );
  const response = useCallback(
    axios.interceptors.response.use(
      (res) => res,
      (err) => {
        console.log('run res err');
        setError(err);
        console.error(err, 'response error');
      }
    ),
    []
  );
  // cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('cleanup');
      axios.interceptors.request.eject(request);
      axios.interceptors.request.eject(response);
    };
  }, [request, response]);

  const closeErrorHandler = () => {
    setError(null);
  };

  return (
    <>
      <Modal show={error} onRemoveBackdrop={closeErrorHandler}>
        {error ? `Something went wrong: ${error.message}` : null}
      </Modal>
      <WrappedComponent {...props} />
    </>
  );
};

export default withErrorHandler;
