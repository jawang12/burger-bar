import React, { Component } from 'react';
import classes from './Main.module.css';
import Toolbar from '../../components/Nav/Toolbar/Toolbar';
import Sidebar from '../../components/Nav/Sidebar/Sidebar';

class Main extends Component {
  state = {
    opened: false
  };

  toggleSidebarHandler = () => {
    this.setState(prevState => {
      return {
        opened: !prevState.opened
      };
    });
  };

  render() {
    return (
      <>
        <Toolbar onOpenSidebar={this.toggleSidebarHandler} />
        <Sidebar
          isOpened={this.state.opened}
          onCloseSidebar={this.toggleSidebarHandler}
        />
        <main className={classes.MainContent}>{this.props.children}</main>
      </>
    );
  }
}

export default Main;
