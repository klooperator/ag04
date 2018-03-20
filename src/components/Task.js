import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import { ListItem } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';

const styles = () => ({
  card: {
    padding: '4px',
  },
  heading: {
    margin: '5px',
  },
  subheading: {
    margin: '5px',
    fontSize: '15px',
  },
});

const source = {
  beginDrag(props, monitor, component) {
    console.log(props, monitor, component);
    const item = { id: props.id, from: props.from, index: props.index };
    return item;
  },
};

const collect = (connect, monitor) => ({
  connectdg: connect.dragSource() || 0,
  isdragging: monitor.isDragging().toString(),
});

/* eslint-disable react/no-find-dom-node */
const Task = (props) => {
  console.log(props);
  const {
    connectdg, classes, data, ...rest
  } = props;
  return (
    <ListItem ref={instance => connectdg(findDOMNode(instance))} {...rest}>
      <Card>
        <CardContent className={classes.card}>
          <h3 className={classes.heading}>{data.name}</h3>
          <span className={classes.subheading}>{data.description}</span>
          <div>{data.tags.map(e => <span key={`tags_for_${data.id}_${e}`}>{e}</span>)}</div>
        </CardContent>
      </Card>
    </ListItem>
  );
};

Task.propTypes = {
  connectdg: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default DragSource('task', source, collect)(withStyles(styles)(Task));
