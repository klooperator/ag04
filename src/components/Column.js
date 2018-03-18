import React from 'react';
import PropTypes from 'prop-types';
import { connect as conn } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import List from 'material-ui/List';
import { moveToColumn } from '../store/Knb';

const target = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    console.log(item);
    if (item) {
      const { store: { dispatch }, props: { name } } = component;
      const payload = {
        to: name,
        from: item.from,
        index: item.index,
      };
      dispatch(moveToColumn(payload));
    }
  },
};

const collect = (connect, monitor) => ({
  connectdt: connect.dropTarget() || 0,
  // You can ask the monitor about the current drag state:
  isover: (monitor.isOver() || 0).toString(),
  isovercurrent: (monitor.isOver({ shallow: true }) || 0).toString(),
  candrop: (monitor.canDrop() || 0).toString(),
  itemType: (monitor.getItemType() || 0).toString(),
  itemdropped: monitor.getDropResult() || 0,
});

/* eslint-disable react/no-find-dom-node */
const Column = (props) => {
  const {
    connectdt, children, dispatch: _, ...rest
  } = props;
  return (
    <div
      style={{
        margin: '5px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        border: '1px solid #eee',
      }}
    >
      <h3>{props.name}</h3>
      <List
        ref={instance => connectdt(findDOMNode(instance))}
        {...rest}
        style={{ marginTop: 'auto', minHeight: '200px', minWidth: '200px' }}
      >
        {children}
      </List>
    </div>
  );
};

Column.defaultProps = {
  children: null,
};

Column.propTypes = {
  connectdt: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default DropTarget('task', target, collect)(conn()(Column));
