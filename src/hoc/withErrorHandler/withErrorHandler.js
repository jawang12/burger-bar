import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import useInterceptor from '../../hooks/interceptor';

const withErrorHandler = (WrappedComponent, axios) => (props) => {
  const [error, closeErrorHandler] = useInterceptor(axios);

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
