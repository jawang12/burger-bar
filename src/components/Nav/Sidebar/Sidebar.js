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
      <div className={sideBarClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
