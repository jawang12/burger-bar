import React, { useEffect, useState } from 'react';
import classes from './Main.module.css';
import Toolbar from '../../components/Nav/Toolbar/Toolbar';
import Sidebar from '../../components/Nav/Sidebar/Sidebar';
import { connect } from 'react-redux';
import { thunkCheckRefreshToken } from '../../store/actions';

const Main = ({ checkPersistentAuth, isAuthenticated, children }) => {
  const [opened, setOpenedState] = useState(false);

  useEffect(() => {
    checkPersistentAuth();
  }, [checkPersistentAuth]);

  const toggleSidebarHandler = () => {
    setOpenedState((prevState) => !prevState);
  };

  return (
    <>
      <Toolbar
        onOpenSidebar={toggleSidebarHandler}
        isAuthenticated={isAuthenticated}
      />
      <Sidebar
        isOpened={opened}
        onCloseSidebar={toggleSidebarHandler}
        isAuthenticated={isAuthenticated}
      />
      <main className={classes.MainContent}>{children}</main>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.idToken && true
});

const mapDispatchToProps = (dispatch) => ({
  checkPersistentAuth: () => dispatch(thunkCheckRefreshToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
