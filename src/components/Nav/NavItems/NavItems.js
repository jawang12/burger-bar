import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const NavigationItems = () => (
  <ul className={classes.NavItems}>
    <NavItem link="/" exact>
      Build Your Burger
    </NavItem>
    <NavItem link="/orders">Orders</NavItem>
    <NavItem link="/login">Login</NavItem>
  </ul>
);

export default NavigationItems;
