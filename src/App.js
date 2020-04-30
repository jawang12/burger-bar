import React, { Suspense, lazy } from 'react';
import Main from './containers/Main/Main';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from './containers/Auth/Logout';
import Spinner from './components/UI/Spinner/Spinner';
import Orders from './containers/Orders/Orders';

// const LazyLoadOrders = lazy(() => import('./containers/Orders/Orders'));
const LazyLoadCheckout = lazy(() => import('./containers/Checkout/Checkout'));
const LazyLoadLogin = lazy(() => import('./containers/Auth/Login'));

const App = (props) => {
  let routes = (
    <Switch>
      <Route
        path="/login"
        render={() => (
          <Suspense fallback={<Spinner />}>
            <LazyLoadLogin />
          </Suspense>
        )}
      />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route
          path="/login"
          render={() => (
            <Suspense fallback={<Spinner />}>
              <LazyLoadLogin />
            </Suspense>
          )}
        />
        <Route
          path="/checkout"
          render={() => (
            <Suspense fallback={<Spinner />}>
              <LazyLoadCheckout />
            </Suspense>
          )}
        />
        {/* <Route
          path="/orders"
          render={() => (
            <Suspense fallback={<Spinner />}>
              <LazyLoadOrders />
            </Suspense>
          )}
        /> */}
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
};

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.idToken && true
});

export default connect(mapStateToProps)(App);
