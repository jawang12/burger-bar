import React from 'react';
import Main from './containers/Main/Main';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Login from './containers/Auth/Login';
import { BrowserRouter, Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/root-reducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Main>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/login" component={Login} />
            <Route path="/" exact component={BurgerBuilder} />
          </Main>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
