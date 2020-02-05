import React from 'react';
import Main from './components/Main';
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
