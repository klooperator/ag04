import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from 'redux-rest-fetcher';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const styles = () => ({
  card: {
    padding: '20px',
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
  },
});
const _c = {
  NAME: 'name',
  DESC: 'description',
  TAGS: 'tags',
  ASIGNEE: 'assignee',
  BLOCK: 'blockedBy',
};

class AddTask extends Component {
  constructor(props) {
    super(props);
    const { task } = props;
    this.state = {
      [_c.NAME]: task && task[_c.NAME] ? task[_c.NAME] : '',
      [_c.DESC]: task && task[_c.DESC] ? task[_c.DESC] : '',
      [_c.TAGS]: task && task[_c.TAGS] ? task[_c.TAGS] : [],
      [_c.ASIGNEE]: task && task[_c.ASIGNEE] ? task[_c.ASIGNEE] : '',
      [_c.BLOCK]: task && task[_c.BLOCK] ? task[_c.BLOCK] : [],
    };
  }

  componentWillReceiveProps(next) {
    if (next.task !== this.props.task) {
      this.setState({
        [_c.NAME]: next.task && next.task[_c.NAME] ? next.task[_c.NAME] : '',
        [_c.DESC]: next.task && next.task[_c.DESC] ? next.task[_c.DESC] : '',
        [_c.TAGS]: next.task && next.task[_c.TAGS] ? next.task[_c.TAGS] : [],
        [_c.ASIGNEE]: next.task && next.task[_c.ASIGNEE] ? next.task[_c.ASIGNEE] : '',
        [_c.BLOCK]: next.task && next.task[_c.BLOCK] ? next.task[_c.BLOCK] : [],
      });
    }
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
      [_c.ASIGNEE]: assignee,
    } = this.state;
    /* const assignee = null; */
    const task = {
      name,
      description,
      status: 'TODO',
      tags,
      assignee,
      blockedBy,
    };
    if (this.props.task !== true && this.props.task) {
      task.id = this.props.task.id;
      api.update_task({ body: task, task_id: task.id });
    } else {
      api.task({ body: task });
    }
    this.props.handleClose();
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
      task,
      classes,
      ...other
    } = this.props;
    return (
      <Dialog PaperProps={{ className: classes.card }} onClose={handleClose} {...other}>
        <DialogTitle>{task && task !== true ? 'Edit task' : 'Add Task'}</DialogTitle>
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
          <FormGroup className={classes.tags}>
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
            <Select
              value={this.state[_c.ASIGNEE]}
              onChange={this.handleAssignee}
              style={{ width: '100%' }}
            >
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
  task: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  users: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  tags: state.api.tags.data,
  users: state.api.users.data,
  tasks: state.api.tasks.data,
});
export default connect(mapStateToProps)(withStyles(styles)(AddTask));
