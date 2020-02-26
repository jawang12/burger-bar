import React from 'react';
import Main from './containers/Main/Main';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter, Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/root-reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers());

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Main>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Main>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
