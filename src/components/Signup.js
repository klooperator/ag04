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
  NAME: 'name',
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [_c.USER]: '',
      [_c.PASS]: '',
      [_c.NAME]: '',
    };
  }
  onInput = what => (event) => {
    this.setState({ [what]: event.target.value });
  };

  submit = () => {
    api.sign_up({
      body: {
        [_c.USER]: this.state[_c.USER],
        [_c.PASS]: this.state[_c.PASS],
        [_c.NAME]: this.state[_c.NAME],
      },
    });
  };

  render() {
    const { handleClose, classes, ...other } = this.props;
    return (
      <Dialog PaperProps={{ className: classes.card }} onClose={handleClose} {...other}>
        <DialogTitle>SignUp</DialogTitle>
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
          <TextField
            id={_c.NAME}
            label={_c.NAME}
            value={this.state[_c.NAME]}
            onChange={this.onInput(_c.NAME)}
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

SignUp.propTypes = {
  handleClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
