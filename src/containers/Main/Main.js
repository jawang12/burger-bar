import React, { Component } from 'react';
import classes from './Main.module.css';
import Toolbar from '../../components/Nav/Toolbar/Toolbar';
import Sidebar from '../../components/Nav/Sidebar/Sidebar';
import { connect } from 'react-redux';

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
        <Toolbar
          onOpenSidebar={this.toggleSidebarHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <Sidebar
          isOpened={this.state.opened}
          onCloseSidebar={this.toggleSidebarHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <main className={classes.MainContent}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.idToken && true
});

export default connect(mapStateToProps)(Main);
