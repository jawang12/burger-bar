import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
  console.log('update');
  return (
    <>
      <Backdrop show={props.show} onRemoveBackdrop={props.onRemoveBackdrop} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? 1 : 0
        }}
      >
        {props.children}
      </div>
    </>
  );
};

const propsAreEqual = (prevProps, nextProps) => {
  if (!prevProps.show) {
    return prevProps.show === nextProps.show;
  } else {
    return (
      prevProps.children === nextProps.children &&
      prevProps.show === nextProps.show
    );
  }
};

export default React.memo(Modal, propsAreEqual);
