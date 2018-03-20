import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Button from 'material-ui/Button';
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
});

class Kanban extends Component {
  constructor(props) {
    super(props);
    this.state = { addTaskModal: false };
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

  render() {
    const { classes, style, knb } = this.props;
    if (!knb) return <div />;
    return (
      <Aux>
        <Card style={style}>
          <CardContent className={classes.card}>
            {_c.map(e => (
              <Column className={classes.list} name={e} key={e}>
                {knb[e] &&
                  knb[e].map((t, i) => (
                    <Task
                      from={e}
                      index={i}
                      key={`${t.name.replace(' ', '')}_${i + 1232}`}
                      id={t.id}
                      data={t}
                      openEdit={this.addTask(t)}
                    />
                  ))}
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
};

const mapStateToProps = state => ({
  knb: state.knb,
});

export default DragDropContext(HTML5Backend)(connect(mapStateToProps)(withStyles(styles)(Kanban)));
