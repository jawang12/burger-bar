import React from 'react';
import Main from './containers/Main/Main';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter, Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Main>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Main>
      </div>
    </BrowserRouter>
  );
}

export default App;
