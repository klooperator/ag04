import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from 'redux-rest-fetcher';
import Button from 'material-ui/Button';

import Login from './Login';
import Signup from './Signup';

class Loginator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  componentWillReceiveProps(next) {
    if (!this.props.in.data && next.in.data && next.in.data.token) {
      this.getEsentialInfo();
    }
    if (!this.props.up.data && next.up.data && next.up.data.token) {
      this.getEsentialInfo();
    }
  }
  getEsentialInfo = () => {
    api.me();
    api.users();
    api.tasks();
    api.tags();
  };
  openModal = what => () => {
    this.setState({ modal: what });
  };
  closeModal = () => {
    this.setState({ modal: false });
  };
  render() {
    const { me } = this.props;
    const { modal } = this.state;

    if (!me.data || !me.data.name) {
      return (
        <div>
          <Button onClick={this.openModal('login')}>Login</Button>
          <Button onClick={this.openModal('signup')}>Signup</Button>
          <Login handleClose={this.closeModal} open={modal === 'login'} />
          <Signup handleClose={this.closeModal} open={modal === 'signup'} />
        </div>
      );
    }
    return <div>{`Hello ${me.data.username}`}</div>;
  }
}
Loginator.propTypes = {
  me: PropTypes.object.isRequired,
  in: PropTypes.object.isRequired,
  up: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  me: state.api.me.data,
  up: state.api.sign_up.data,
  in: state.api.sign_in.data,
});
export default connect(mapStateToProps)(Loginator);
