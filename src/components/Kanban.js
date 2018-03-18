import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
/* import api from 'redux-rest-fetcher'; */
import Card, { CardContent } from 'material-ui/Card';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Button from 'material-ui/Button';
import Task from './Task';
import Column from './Column';

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
  /* constructor(props) {
    super(props);
    this.state = { knb: undefined };
  }
  componentWillReceiveProps(next) {
    console.log(next);
    if (!this.props.tasks.data && next.tasks.data) {
      this.setState({ knb: this.getTasks(next.tasks.data) });
    }
  } */

  addTask = name => () => {
    console.log(name);
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

  render() {
    console.log(this);
    const { classes, style, knb } = this.props;
    /* const { knb } = this.state; */
    if (!knb) return <div />;
    return (
      <Card style={style}>
        <CardContent className={classes.card}>
          {Object.keys(knb).map(e => (
            <Column className={classes.list} name={e} key={e}>
              {knb[e].map((t, i) => (
                <Task
                  from={e}
                  index={i}
                  key={`${t.name.replace(' ', '')}_${i + 1232}`}
                  id={`${e}_${i}`}
                  data={t}
                />
              ))}
              <Button className={classes.addButton} onClick={this.addTask(e)}>
                Add
              </Button>
            </Column>
          ))}
        </CardContent>
      </Card>
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
