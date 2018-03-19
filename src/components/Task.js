import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import { ListItem } from 'material-ui/List';
import Card, { CardContent } from 'material-ui/Card';

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
  const { connectdg, data, ...rest } = props;
  return (
    <ListItem ref={instance => connectdg(findDOMNode(instance))} {...rest}>
      <Card>
        <CardContent>
          <h3>{data.name}</h3>
          <span>{data.description}</span>
        </CardContent>
      </Card>
    </ListItem>
  );
};

Task.propTypes = {
  connectdg: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default DragSource('task', source, collect)(Task);
