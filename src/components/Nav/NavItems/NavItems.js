import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const NavItems = props => (
  <ul className={classes.NavItems}>
    <NavItem link="/" exact>
      Build Your Burger
    </NavItem>
    {props.isAuthenticated ? <NavItem link="/orders">Orders</NavItem> : null}
    {props.isAuthenticated ? (
      <NavItem link="/logout">Logout</NavItem>
    ) : (
      <NavItem link="/login">Login</NavItem>
    )}
  </ul>
);

export default NavItems;
