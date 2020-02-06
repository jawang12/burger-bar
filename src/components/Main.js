import React from 'react';
import classes from './Main.module.css';
import Toolbar from './Nav/Toolbar/Toolbar';
import Sidebar from './Nav/Sidebar/Sidebar';

const main = props => {
  return (
    <>
      <Toolbar />
      <Sidebar />
      <main className={classes.MainContent}>{props.children}</main>
    </>
  );
};

export default main;
