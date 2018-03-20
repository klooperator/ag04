import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from 'redux-rest-fetcher';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = () => ({
  card: {
    padding: '20px',
  },
  submitBttn: {
    margin: '20px 0 0 0',
  },
});

const _c = {
  USER: 'username',
  PASS: 'password',
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [_c.USER]: '',
      [_c.PASS]: '',
    };
  }
  onInput = what => (event) => {
    this.setState({ [what]: event.target.value });
  };

  submit = () => {
    api.sign_in({
      body: {
        [_c.USER]: this.state[_c.USER],
        [_c.PASS]: this.state[_c.PASS],
      },
    });
  };

  render() {
    const { handleClose, classes, ...other } = this.props;
    return (
      <Dialog PaperProps={{ className: classes.card }} onClose={handleClose} {...other}>
        <DialogTitle>Login</DialogTitle>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            id={_c.USER}
            label={_c.USER}
            value={this.state[_c.USER]}
            onChange={this.onInput(_c.USER)}
            margin="normal"
          />
          <TextField
            id={_c.PASS}
            label={_c.PASS}
            value={this.state[_c.PASS]}
            onChange={this.onInput(_c.PASS)}
            margin="normal"
          />
          <Button className={classes.submitBttn} onClick={this.submit}>
            Submit
          </Button>
        </div>
      </Dialog>
    );
  }
}

Login.propTypes = {
  handleClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Login);
