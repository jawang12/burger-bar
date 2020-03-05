import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './Login.module.css';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Login extends Component {
  state = {
    hasAccount: true,
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
    if (validators.isEmail) {
      const emailRegEx = new RegExp(/^\S+@\S+\.\S+$/);
      isValid = emailRegEx.test(value);
    }
    return isValid;
  };

  inputChangeHandler = (event, inputName) => {
    const value = event.target.value;
    this.setState({
      loginForm: {
        ...this.state.loginForm,
        [inputName]: {
          ...this.state.loginForm[inputName],
          value,
          touched: true,
          valid: this.validator(
            this.state.loginForm[inputName].validators,
            value
          )
        }
      }
    });
  };

  loginHandler = e => {
    e.preventDefault();
    this.props.thunkVerifyAuth(
      this.state.loginForm.email.value,
      this.state.loginForm.password.value,
      this.state.hasAccount
    );
  };

  toggleLoginHander = () => {
    this.setState(prevState => ({ hasAccount: !prevState.hasAccount }));
  };

  render() {
    let loginInputs = Object.keys(this.state.loginForm).map(inputName => (
      <Input
        elementConfig={this.state.loginForm[inputName].elementConfig}
        elementType={this.state.loginForm[inputName].elementType}
        value={this.state.loginForm[inputName].value}
        onInputChange={e => this.inputChangeHandler(e, inputName)}
        touched={this.state.loginForm[inputName].touched}
        invalid={!this.state.loginForm[inputName].valid}
        key={inputName}
      />
    ));

    if (this.props.loading) {
      loginInputs = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <div className={classes.Login}>
        <form onSubmit={this.loginHandler}>
          {errorMessage}
          {loginInputs}
          <Button btnType="Success">
            {this.state.hasAccount ? 'Login' : 'Create Account'}
          </Button>
        </form>
        <Button btnType="Danger" click={this.toggleLoginHander}>
          {this.state.hasAccount
            ? 'Create a new account'
            : `I'm an existing user`}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  thunkVerifyAuth: (email, password, hasAccount) =>
    dispatch(actions.thunkVerifyAuth(email, password, hasAccount))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
