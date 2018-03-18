import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* import { connect } from 'react-redux'; */
import { hot } from 'react-hot-loader';
import { Kanban, Loginator } from './components';

/* class App extends Component {
  render() {
    return (
      <div style={{ height: '100%', width: '100%', padding: '5s%' }}>
        <div>kjdsk</div>
      </div>
    );
  }
} */

const App = () => (
  <div
    style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
    }}
  >
    <div style={{ alignSelf: 'flex-start', justifySelf: 'right' }}>
      <Loginator />
    </div>
    <Kanban style={{ alignSelf: 'center', justifySelf: 'center' }} />
  </div>
);

export default hot(module)(App);

/* export default App; */
