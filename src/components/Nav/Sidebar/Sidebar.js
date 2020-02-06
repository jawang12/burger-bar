import React from 'react';
import Logo from '../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './Sidebar.module.css';

const Sidebar = () => (
  <div className={classes.Sidebar}>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav>
      <NavItems />
    </nav>
  </div>
);

export default Sidebar;
