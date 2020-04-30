import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './CustomerInfo.module.css';
import PropTypes from 'prop-types';
import axios from '../../../axios/orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { thunkSubmitOrder } from '../../../store/actions/orders';
import { validator } from '../../../shared/utils';

const CustomerInfo = (props) => {
  const [state, setFormState] = useState({
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
          isRequired: true,
          isEmail: true
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
  });

  const submitOrderHandler = (e) => {
    e.preventDefault();
    const customerInfo = Object.keys(state.orderForm).reduce(
      (obj, inputName) => {
        obj[inputName] = state.orderForm[inputName].value;
        return obj;
      },
      {}
    );

    const fullOrder = {
      customerInfo,
      ingredients: props.ingredients,
      price: props.price,
      userId: props.userId
    };

    props.thunkSubmitOrder(fullOrder, props.idToken);
  };

  const inputChangeHandler = (e, name) => {
    const updatedOrderForm = { ...state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[name] };

    updatedFormElement.value = e.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = validator(
      updatedFormElement.validators,
      e.target.value
    );
    updatedOrderForm[name] = updatedFormElement;
    setFormState({ orderForm: updatedOrderForm });
  };

  const orderInputs = Object.keys(state.orderForm).map((inputName) => (
    <Input
      elementConfig={state.orderForm[inputName].elementConfig}
      elementType={state.orderForm[inputName].elementType}
      value={state.orderForm[inputName].value}
      onInputChange={(e) => inputChangeHandler(e, inputName)}
      touched={state.orderForm[inputName].touched}
      invalid={!state.orderForm[inputName].valid}
      key={inputName}
    />
  ));

  const disableButton = Object.values(state.orderForm).every(
    (inputName) => inputName.valid === true
  );

  return (
    <div className={classes.CustomerInfo}>
      <h3>Please enter your contact information</h3>
      {props.loading ? (
        <Spinner />
      ) : (
        <form onSubmit={submitOrderHandler}>
          {orderInputs}
          <Button disabled={!disableButton} btnType="Success">
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

CustomerInfo.propTypes = {
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { ingredients, price } = state.burgerBuilder;
  const { loading } = state.orders;
  const { idToken, userId } = state.auth;
  return {
    ingredients,
    price,
    loading,
    userId,
    idToken
  };
};

const mapDispatchToProps = (dispatch) => ({
  thunkSubmitOrder: (order, idToken) =>
    dispatch(thunkSubmitOrder(order, idToken))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(CustomerInfo, axios));
