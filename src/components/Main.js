import React from 'react';

const main = props => {
  return (
    <>
      <div>Toolbar, Sidedrawer, Backdrop</div>
      <main>{props.children}</main>
    </>
  );
};

export default main;
