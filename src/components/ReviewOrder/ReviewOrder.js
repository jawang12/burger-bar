import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './ReviewOrder.module.css';

const ReviewOrder = props => {
  return (
    <div className={classes.ReviewOrder}>
      <h1>You're almost set.</h1>
      <div className={classes.Burger}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger">Cancel</Button>
      <Button btnType="Success">Submit</Button>
    </div>
  );
};

export default ReviewOrder;
