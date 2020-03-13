import React, { Component } from 'react';
import Main from './containers/Main/Main';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Login from './containers/Auth/Login';
import { Route, Switch, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import { connect } from 'react-redux';
import Logout from './containers/Auth/Logout';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      console.log('authenticated');
      routes = (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      );
    }

    return (
      <div>
        <Main>{routes}</Main>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.idToken && true
});

export default connect(mapStateToProps)(App);
