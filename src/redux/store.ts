import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers';
import { initialState, State } from './State';
import { rootSaga } from './sagas';
import { UserActions } from './actions/userActions';

export const configureStore = (): Store<State, UserActions> => {
  const composeEnhancers = composeWithDevTools({
    name: 'github-users',
  });

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(sagaMiddleware)));

  sagaMiddleware.run(rootSaga);

  return store;
};
