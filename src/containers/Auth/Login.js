import React, { useState } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './Login.module.css';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { validator } from '../../shared/utils';

const Login = (props) => {
  const [hasAccount, setHasAccount] = useState(true);
  const [state, setFormState] = useState({
    loginForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Username',
          name: 'email'
        },
        validators: {
          isRequired: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        value: ''
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
          name: 'password'
        },
        validators: {
          isRequired: true,
          minLength: 7
        },
        valid: false,
        touched: false,
        value: ''
      }
    }
  });

  const inputChangeHandler = (event, inputName) => {
    const value = event.target.value;
    setFormState((prevFormState) => ({
      loginForm: {
        ...prevFormState.loginForm,
        [inputName]: {
          ...prevFormState.loginForm[inputName],
          value,
          touched: true,
          valid: validator(prevFormState.loginForm[inputName].validators, value)
        }
      }
    }));
  };

  const loginHandler = (e) => {
    e.preventDefault();
    props.sagaVerifyAuth(
      state.loginForm.email.value,
      state.loginForm.password.value,
      hasAccount
    );
  };

  const toggleLoginHander = () => {
    setHasAccount((prevHasAccount) => !prevHasAccount);
  };

  let loginInputs = Object.keys(state.loginForm).map((inputName) => (
    <Input
      elementConfig={state.loginForm[inputName].elementConfig}
      elementType={state.loginForm[inputName].elementType}
      value={state.loginForm[inputName].value}
      onInputChange={(e) => inputChangeHandler(e, inputName)}
      touched={state.loginForm[inputName].touched}
      invalid={!state.loginForm[inputName].valid}
      key={inputName}
    />
  ));

  if (props.loading) {
    loginInputs = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  if (props.isAuthenticated) {
    return props.isBuilding ? <Redirect to="/checkout" /> : <Redirect to="/" />;
  }

  return (
    <div className={classes.Login}>
      <form onSubmit={loginHandler}>
        {errorMessage}
        {loginInputs}
        <Button btnType="Success">
          {hasAccount ? 'Login' : 'Create Account'}
        </Button>
      </form>
      <Button btnType="Danger" click={toggleLoginHander}>
        {hasAccount ? 'Create a new account' : `I'm an existing user`}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.idToken && true,
  loading: state.auth.loading,
  error: state.auth.error,
  isBuilding: state.burgerBuilder.isBuilding
});

const mapDispatchToProps = (dispatch) => ({
  sagaVerifyAuth: (email, password, hasAccount) =>
    dispatch(actions.sagaVerifyAuth(email, password, hasAccount))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
