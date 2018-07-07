import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import App from './App';
import Header from './Header/';
import * as api from 'api';

class Root extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    api.onAuthChange(
      (user) => {
        dispatch({
          type: 'USER_LOGIN',
          user,
        });
      },
      () => dispatch({
        type: 'USER_LOGOUT',
      }),
    );
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <App />
      </React.Fragment>
    );
  }
}

export default withRouter(connect()(Root));
