import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const NavigationItems = () => (
  <ul className={classes.NavItems}>
    <NavItem link="/">Build Your Burger</NavItem>
    <NavItem link="/checkout">Checkout</NavItem>
  </ul>
);

export default NavigationItems;
