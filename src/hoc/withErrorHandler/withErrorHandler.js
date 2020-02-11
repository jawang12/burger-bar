import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) =>
  class ErrorHandler extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null
      };
      this.req = axios.interceptors.request.use(
        req => req,
        error => {
          console.error(error);
        }
      );
      this.res = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
          console.error(error);
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.req);
      axios.interceptors.response.eject(this.res);
    }

    closeErrorHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            onRemoveBackdrop={this.closeErrorHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };

export default withErrorHandler;
