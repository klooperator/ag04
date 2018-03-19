import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from 'redux-rest-fetcher';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const _c = {
  NAME: 'name',
  DESC: 'description',
  TAGS: 'tags',
  ASIGNEE: 'asignee',
  BLOCK: 'blocked_by',
};

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [_c.NAME]: '',
      [_c.DESC]: '',
      [_c.TAGS]: [],
      [_c.ASIGNEE]: '',
      [_c.BLOCK]: [],
    };
  }
  onInput = what => (event) => {
    this.setState({ [what]: event.target.value });
  };

  submit = () => {
    const {
      [_c.NAME]: name,
      [_c.DESC]: description,
      [_c.TAGS]: tags,
      [_c.BLOCK]: blockedBy,
    } = this.state;
    const asignee = null;
    const task = {
      name,
      description,
      status: 'TODO',
      tags,
      asignee,
      blockedBy,
    };
    console.log(task);
    api.task({ body: task });
  };

  handleTagChange = id => (e) => {
    const tags = this.state[_c.TAGS];
    if (e.target.checked) tags.push(id);
    else {
      tags.splice(tags.indexOf(id), 1);
    }
    this.setState({ [_c.TAGS]: tags });
  };

  handleBlockbyChange = id => (e) => {
    const block = this.state[_c.BLOCK];
    if (e.target.checked) block.push(id);
    else {
      block.splice(block.indexOf(id), 1);
    }
    this.setState({ [_c.BLOCK]: block });
  };

  handleAssignee = (e) => {
    const { value } = e.target;
    if (value !== '' && value) {
      this.setState({ [_c.ASIGNEE]: value });
    } else this.setState({ [_c.ASIGNEE]: '' });
  };

  render() {
    console.log(this);
    const {
      handleClose,
      users: { data: users },
      tags: { data: tags },
      tasks: { data: tasks },
      dispatch: _,
      ...other
    } = this.props;
    return (
      <Dialog onClose={handleClose} {...other}>
        <DialogTitle>AddTask</DialogTitle>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            id={_c.NAME}
            label={_c.NAME}
            value={this.state[_c.NAME]}
            onChange={this.onInput(_c.NAME)}
            margin="normal"
          />
          <TextField
            id={_c.DESC}
            label={_c.DESC}
            value={this.state[_c.DESC]}
            onChange={this.onInput(_c.DESC)}
            margin="normal"
          />
          <FormGroup>
            {!!tags &&
              tags.map(t => (
                <FormControlLabel
                  key={`${t.name}_${t.id}`}
                  control={
                    <Checkbox
                      checked={this.state.tags && this.state.tags.indexOf(t.id) !== -1}
                      onChange={this.handleTagChange(t.id)}
                      value={`${t.id}`}
                    />
                  }
                  label={t.name}
                />
              ))}
          </FormGroup>
          <div>
            <h4>Asigne to:</h4>
            <Select value={this.state[_c.ASIGNEE]} onChange={this.handleAssignee}>
              {!!users &&
                users.map(t => (
                  <MenuItem value={t.id} key={`tag_key_${t.id}`}>
                    {t.name}
                  </MenuItem>
                ))}
            </Select>
          </div>
          <div>
            <h4>Blocked by:</h4>
            <List>
              {!!tasks &&
                tasks.map(t => (
                  <ListItem
                    key={`tag_key_${t.id}`}
                    dense
                    button
                    onClick={this.handleBlockbyChange(t.id)}
                  >
                    <ListItemText primary={t.name} />
                    <Checkbox
                      checked={this.state[_c.BLOCK].indexOf(t.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItem>
                ))}
            </List>
          </div>
          <Button onClick={this.submit}>Submit</Button>
        </div>
      </Dialog>
    );
  }
}

AddTask.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  tags: state.api.tags.data,
  users: state.api.users.data,
  tasks: state.api.tasks.data,
});
export default connect(mapStateToProps)(AddTask);

/* <Select value="">
            {!!tags &&
              tags.map(t => (
                <MenuItem value={t.id} key={`tag_key_${t.id}`}>
                  {t.name}
                </MenuItem>
              ))}
          </Select> */
/* <Select value={this.state[_c.BLOCK]}>
              {!!tasks &&
                tasks.map(t => (
                  <MenuItem value={t.id} key={`tag_key_${t.id}`}>
                    {t.name}
                  </MenuItem>
                ))}
            </Select> */
