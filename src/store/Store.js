import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import Communicator from 'redux-rest-fetcher';
import knb from './Knb';

const api = Communicator.getReducer();

const rootReducer = combineReducers({
  api,
  knb,
});
export default (initialState = {}) => {
  const middlewares = [];

  const enhancers = [
    applyMiddleware(...middlewares),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f,
  ];

  const store = createStore(rootReducer, initialState, compose(...enhancers));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../App', () => {
      try {
        const nextReducer = rootReducer;
        store.replaceReducer(nextReducer);
      } catch (error) {
        console.error(`==> Reducer hot reloading error ${error}`);
      }
    });
  }

  return store;
};
