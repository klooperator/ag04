import React from 'react';
import { render } from 'react-dom';
import api from 'redux-rest-fetcher';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './src/App';
import calls from './src/api/Calls';
import createStore from './src/store/Store';

api.setBaseUrl('http://localhost:5000');
api.setBaseOptions({
  credentials: 'omit',
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Cache: 'no-cache',
    credentials: 'same-origin',
  },
});
api.setEndpoints(calls);
const store = createStore();

api.setDispatcher(store.dispatch);
api.setGetState(store.getState);

api.sign_in({ body: { username: 'klo', password: 'test' } });

const CENTRAL_NODE = document.getElementById('app');

const renderApp = () => {
  render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    CENTRAL_NODE,
  );
};

renderApp();
