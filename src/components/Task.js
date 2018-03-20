import React from 'react';
import PropTypes from 'prop-types';
import { connect as conn } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import { ListItem } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import { colors } from '../utils';

const styles = () => ({
  card: {
    padding: '4px',
  },
  heading: {
    margin: '5px',
  },
  subheading: {
    margin: '5px',
    fontSize: '14px',
  },
  tags: {
    display: 'inline-flex',
    flexDirection: 'column',
    margin: '20px 5px 5px 5px',
    border: '1px solid #eee',
    padding: '10px',
  },
  tasks: {
    display: 'inline-flex',
    flexDirection: 'column',
    margin: '20px 5px 5px 5px',
    border: '1px solid #eee',
    padding: '10px',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const source = {
  beginDrag(props, monitor, component) {
    const item = {
      id: props.id,
      from: props.from,
      index: props.index,
      taskName: component.props.data.name,
      blockedBy: component.props.data.blockedBy,
    };
    return item;
  },
};

const collect = (connect, monitor) => ({
  connectdg: connect.dragSource() || 0,
  isdragging: monitor.isDragging().toString(),
});

/* eslint-disable react/no-find-dom-node */
const Task = (props) => {
  const {
    connectdg,
    openEdit,
    classes,
    data,
    tags: { data: tags },
    tasks: { data: tasks },
    dispatch: _,
    ...rest
  } = props;
  const getTag = (id) => {
    let out;
    if (!tags) return {};
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].id === id) {
        out = tags[i];
        break;
      }
    }
    return out;
  };
  const getTask = (id) => {
    let out;
    if (!tasks) return {};
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        out = tasks[i];
        break;
      }
    }
    return out;
  };
  return (
    <ListItem ref={instance => connectdg(findDOMNode(instance))} {...rest}>
      <Card onClick={openEdit}>
        <CardContent className={classes.card}>
          <h3 className={classes.heading}>{data.name}</h3>
          <span className={classes.subheading}>{data.description}</span>
          <div className={classes.wrapper}>
            <div className={classes.tags}>
              {data.tags.map((e) => {
                const temp = getTag(e);
                return (
                  <span style={{ color: colors[e] }} key={`tags_for_${data.id}_${e}`}>
                    {temp.name || ''}
                  </span>
                );
              })}
            </div>
            <div className={classes.tasks}>
              <strong>Blocked by:</strong>
              {data.blockedBy.map((e) => {
                const temp = getTask(e);
                return <span key={`task_blockeby_${e}`}>{temp.name}</span>;
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </ListItem>
  );
};

Task.defaultProps = {
  openEdit: () => {},
};

Task.propTypes = {
  connectdg: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  openEdit: PropTypes.func,
  classes: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStatToProps = state => ({
  tags: state.api.tags.data,
  tasks: state.api.tasks.data,
});

export default DragSource('task', source, collect)(conn(mapStatToProps)(withStyles(styles)(Task)));
