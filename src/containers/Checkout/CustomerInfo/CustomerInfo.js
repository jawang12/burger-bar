import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './CustomerInfo.module.css';
import PropTypes from 'prop-types';
import axios from '../../../axios/orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { thunkSubmitOrder } from '../../../store/actions/orders';

class CustomerInfo extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name',
          name: 'name'
        },
        validators: {
          isRequired: true
        },
        valid: false,
        touched: false,
        value: ''
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'address',
          placeholder: 'Street Address'
        },
        validators: {
          isRequired: true
        },
        valid: false,
        touched: false,
        value: ''
      },
      zip: {
        elementType: 'input',
        elementConfig: {
          name: 'zip',
          type: 'text',
          placeholder: 'Zip Code'
        },
        validators: {
          isRequired: true,
          maxLength: 5,
          minLength: 5
        },
        valid: false,
        touched: false,
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'country',
          placeholder: 'Country'
        },
        validators: {
          isRequired: true
        },
        valid: false,
        touched: false,
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          name: 'email',
          placeholder: 'Email'
        },
        validators: {
          isRequired: true
        },
        valid: false,
        touched: false,
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
        validators: {},
        valid: true,
        touched: true,
        value: 'normal'
      }
    }
  };

  submitOrderHandler = e => {
    e.preventDefault();
    const customerInfo = Object.keys(this.state.orderForm).reduce(
      (obj, inputName) => {
        obj[inputName] = this.state.orderForm[inputName].value;
        return obj;
      },
      {}
    );

    const fullOrder = {
      customerInfo,
      ingredients: this.props.ingredients,
      price: this.props.price
    };

    this.props.thunkSubmitOrder(fullOrder);
  };

  inputChangeHandler = (e, name) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[name] };

    updatedFormElement.value = e.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.validator(
      updatedFormElement.validators,
      e.target.value
    );
    updatedOrderForm[name] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  validator = (validators, value) => {
    let isValid = true;

    if (validators.isRequired) {
      isValid = isValid && value.trim() !== '';
    }
    if (validators.maxLength) {
      isValid = isValid && value.length <= validators.maxLength;
    }
    if (validators.minLength) {
      isValid = isValid && value.length >= validators.minLength;
    }
    return isValid;
  };

  render() {
    const orderInputs = Object.keys(this.state.orderForm).map(inputName => (
      <Input
        elementConfig={this.state.orderForm[inputName].elementConfig}
        elementType={this.state.orderForm[inputName].elementType}
        value={this.state.orderForm[inputName].value}
        onInputChange={e => this.inputChangeHandler(e, inputName)}
        touched={this.state.orderForm[inputName].touched}
        invalid={!this.state.orderForm[inputName].valid}
        key={inputName}
      />
    ));

    const disableButton = Object.values(this.state.orderForm).every(
      inputName => inputName.valid === true
    );

    console.log(disableButton);

    return (
      <div className={classes.CustomerInfo}>
        <h3>Please enter your contact information</h3>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.submitOrderHandler}>
            {orderInputs}
            <Button disabled={!disableButton} btnType="Success">
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

const mapStateToProps = state => {
  const { ingredients, price } = state.burgerBuilder;
  const { loading } = state.orders;
  return {
    ingredients,
    price,
    loading
  };
};

const mapDispatchToProps = dispatch => ({
  thunkSubmitOrder: order => dispatch(thunkSubmitOrder(order))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(CustomerInfo, axios));
