import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './CustomerInfo.module.css';
import PropTypes from 'prop-types';
import axios from '../../../axios/orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

export default class CustomerInfo extends Component {
  state = {
    loading: false
  };

  submitOrderHandler = e => {
    this.setState({ loading: true });
    e.preventDefault();

    const customer = {
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

    const fullOrder = {
      ...customer,
      ingredients: this.props.ingredients,
      price: this.props.price
    };
    console.log(fullOrder);

    axios
      .post('/orders.json', fullOrder)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push('/');
        console.log('success from CustomerInfo', res);
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  render() {
    return (
      <div className={classes.CustomerInfo}>
        <h3>Please enter your contact information</h3>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form>
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="email" placeholder="Email Address" />
            <input type="text" name="address" placeholder="Address" />
            <input type="text" name="zip" placeholder="Zip Code" />
            <Button click={this.submitOrderHandler} btnType="Success">
              Submit
            </Button>
          </form>
        )}
      </div>
    );
  }
}

CustomerInfo.propTypes = {
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.object.isRequired
};
