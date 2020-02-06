import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const NavigationItems = () => (
  <ul className={classes.NavItems}>
    <NavItem active link="/">
      Build Your Burger
    </NavItem>
    <NavItem link="/">Checkout</NavItem>
  </ul>
);

export default NavigationItems;
