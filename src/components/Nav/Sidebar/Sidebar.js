import React from 'react';
import Logo from '../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './Sidebar.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const Sidebar = props => {
  const sideBarClasses = [
    classes.Sidebar,
    props.isOpened ? classes.Open : classes.Close
  ];

  return (
    <>
      <Backdrop show={props.isOpened} onRemoveBackdrop={props.onCloseSidebar} />
      <div className={sideBarClasses.join(' ')} onClick={props.onCloseSidebar}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
