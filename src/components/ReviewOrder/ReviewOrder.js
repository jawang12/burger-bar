import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './ReviewOrder.module.css';

const ReviewOrder = props => (
  <div className={classes.ReviewOrder}>
    <h1>You're almost set.</h1>
    <div className={classes.Burger}>
      <Burger ingredients={props.ingredients} />
    </div>
    <Button click={props.onCancelCheckout} btnType="Danger">
      Cancel
    </Button>
    <Button click={props.onContinueCheckout} btnType="Success">
      Confirm
    </Button>
  </div>
);

export default ReviewOrder;
