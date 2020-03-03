import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './Login.module.css';
import Input from '../../components/UI/Input/Input';

class Login extends Component {
  state = {
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
          type: 'text',
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

  render() {
    const loginInputs = Object.keys(this.state.loginForm).map(inputName => (
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

    return (
      <div className={classes.Login}>
        <form>
          {loginInputs}
          <Button btnType="Success">Login</Button>
        </form>
      </div>
    );
  }
}

export default Login;
