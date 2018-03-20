import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Button from 'material-ui/Button';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Checkbox from 'material-ui/Checkbox';
import Task from './Task';
import Column from './Column';
import AddTask from './AddTask';

const Aux = props => props.children;

const _c = ['TODO', 'IN_PROGRESS', 'DONE'];

const styles = () => ({
  card: {
    display: 'flex',
  },
  addButton: {
    marginTop: 'auto',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
  },
});

class Kanban extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addTaskModal: false,
      userFilter: undefined,
      tagFilter: [],
    };
  }

  addTask = data => () => {
    this.setState({ addTaskModal: data });
  };

  getTasks = (data) => {
    if (!data) return [[]];
    const out = {};
    data.forEach((d) => {
      if (out[d.status]) {
        out[d.status].push(d);
      } else {
        out[d.status] = [d];
      }
    });
    _c.forEach((c) => {
      if (!out[c]) out[c] = [];
    });
    return out;
  };

  closeAddTask = () => {
    this.setState({ addTaskModal: false });
  };
  checkFilters = (task) => {
    const { userFilter, tagFilter } = this.state;
    let out = true;
    if (userFilter && userFilter !== task.assignee) return false;
    if (tagFilter.length > 0) {
      task.tags.forEach((e) => {
        if (tagFilter.indexOf(e) !== -1) out = false;
      });
    }
    return out;
  };

  handleTagChange = id => (e) => {
    const { tagFilter } = this.state;
    if (!e.target.checked) {
      tagFilter.push(id);
    } else {
      tagFilter.splice(tagFilter.indexOf(id), 1);
    }
    console.log(tagFilter);
    this.setState({ tagFilter });
  };
  handleAssignee = (e) => {
    const { value } = e.target;
    if (value !== '' && value) {
      this.setState({ userFilter: value !== -1 ? value : undefined });
    }
  };

  render() {
    console.log(this);
    const {
      classes, style, knb, tags: { data: tags }, users: { data: users },
    } = this.props;
    if (!knb) return <div />;
    return (
      <Aux>
        <div>
          <FormGroup className={classes.tags}>
            {!!tags &&
              tags.map(t => (
                <FormControlLabel
                  key={`${t.name}_${t.id}`}
                  control={
                    <Checkbox
                      checked={this.state.tagFilter.indexOf(t.id) === -1}
                      onChange={this.handleTagChange(t.id)}
                      value={`${t.id}`}
                    />
                  }
                  label={t.name}
                />
              ))}
          </FormGroup>
        </div>
        <div>
          <Select
            value={this.state.userFilter || ''}
            onChange={this.handleAssignee}
            style={{ width: '250px' }}
            displayEmpty
          >
            {!!users &&
              [{ id: -1, name: '-' }].concat(users).map(t => (
                <MenuItem value={t.id} key={`tag_key_${t.id}`}>
                  {t.name}
                </MenuItem>
              ))}
          </Select>
        </div>
        <Card style={style}>
          <CardContent className={classes.card}>
            {_c.map(e => (
              <Column className={classes.list} name={e} key={e}>
                {knb[e] &&
                  knb[e].map((t, i) => {
                    if (this.checkFilters(t)) {
                      return (
                        <Task
                          from={e}
                          index={i}
                          key={`${t.name.replace(' ', '')}_${i + 1232}`}
                          id={t.id}
                          data={t}
                          openEdit={this.addTask(t)}
                        />
                      );
                    }
                    return undefined;
                  })}
                {e === 'TODO' && (
                  <Button className={classes.addButton} onClick={this.addTask(true)}>
                    Add
                  </Button>
                )}
              </Column>
            ))}
          </CardContent>
        </Card>
        <AddTask
          task={this.state.addTaskModal}
          open={!!this.state.addTaskModal}
          handleClose={this.closeAddTask}
        />
      </Aux>
    );
  }
}

Kanban.defaultProps = {
  style: {},
};
Kanban.propTypes = {
  knb: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
  users: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  knb: state.knb,
  users: state.api.users.data,
  tags: state.api.tags.data,
});

export default DragDropContext(HTML5Backend)(connect(mapStateToProps)(withStyles(styles)(Kanban)));
