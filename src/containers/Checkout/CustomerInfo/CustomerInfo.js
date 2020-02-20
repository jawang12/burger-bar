import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './CustomerInfo.module.css';
import PropTypes from 'prop-types';
import axios from '../../../axios/orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

export default class CustomerInfo extends Component {
  state = {
    loading: false,
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name',
          name: 'name'
        },
        value: ''
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'address',
          placeholder: 'Street Address'
        },
        value: ''
      },
      zip: {
        elementType: 'input',
        elementConfig: {
          name: 'zip',
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'country',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          name: 'email',
          placeholder: 'Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'normal', displayValue: 'Normal' },
            { value: 'rush', displayValue: 'Rush' }
          ]
        },
        value: ''
      }
    }
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

  inputChangeHandler = (e, name) => {
    // this.setState({ orderForm: { [name]: { value: e.target.value } } });
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[name] };

    updatedFormElement.value = e.target.value;
    updatedOrderForm[name] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const orderInputs = Object.keys(this.state.orderForm).map(inputName => (
      <Input
        elementConfig={this.state.orderForm[inputName].elementConfig}
        elementType={this.state.orderForm[inputName].elementType}
        value={this.state.orderForm[inputName].value}
        onInputChange={e => this.inputChangeHandler(e, inputName)}
        key={inputName}
      />
    ));

    return (
      <div className={classes.CustomerInfo}>
        <h3>Please enter your contact information</h3>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form>
            {orderInputs}
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
