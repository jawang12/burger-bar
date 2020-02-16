import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './CustomerInfo.module.css';

export default class CustomerInfo extends Component {
  state = {
    customer: {
      name: 'James Bond',
      address: {
        street: 'Main St',
        city: 'London',
        country: 'UK'
      },
      email: '007@mi6.com'
    },
    priority: 'fastest'
  };

  render() {
    return (
      <div className={classes.CustomerInfo}>
        <h3>Please enter your contact information</h3>
        <form>
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="email" placeholder="Email Address" />
          <input type="text" name="address" placeholder="Address" />
          <input type="text" name="zip" placeholder="Zip Code" />
        </form>
        <Button btnType="Success">Submit</Button>
      </div>
    );
  }
}
