import React, { Suspense, lazy } from 'react';
import Main from './containers/Main/Main';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from './containers/Auth/Logout';
import Spinner from './components/UI/Spinner/Spinner';

const LazyLoadOrders = lazy(() => import('./containers/Orders/Orders'));
const LazyLoadCheckout = lazy(() => import('./containers/Checkout/Checkout'));
const LazyLoadLogin = lazy(() => import('./containers/Auth/Login'));

const App = (props) => {
  let routes = (
    <Switch>
      <Route path="/login" component={LazyLoadLogin} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/login" component={LazyLoadLogin} />
        <Route path="/checkout" component={LazyLoadCheckout} />
        <Route path="/orders" component={LazyLoadOrders} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
      </Switch>
    );
  }

  return (
    <div>
      <Main>
        <Suspense fallback={<Spinner />}>{routes}</Suspense>
      </Main>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.idToken && true
});

export default connect(mapStateToProps)(App);

/* 
ensures routing props are passed when using render 
  <Route
    path="/checkout"
    render={(props) => (
      <Suspense fallback={<Spinner />}>
        <LazyLoadCheckout {...props} />
      </Suspense>
    )}
  />
*/
