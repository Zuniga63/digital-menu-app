import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  AnyAction,
} from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';

import NavMenuReducer from './reducers/NavMenuReducer';

const rootReducer = combineReducers({ NavMenuReducer });

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<unknown, unknown, AnyAction>;
