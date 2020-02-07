import React from 'react';
import Main from './containers/Main/Main';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

function App() {
  return (
    <div>
      <Main>
        <BurgerBuilder />
      </Main>
    </div>
  );
}

export default App;
