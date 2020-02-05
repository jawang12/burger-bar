import React from 'react';
import classes from './Main.module.css';

const main = props => {
  return (
    <>
      <nav>Toolbar, Sidedrawer, Backdrop</nav>
      <main className={classes.Main_Content}>{props.children}</main>
    </>
  );
};

export default main;
