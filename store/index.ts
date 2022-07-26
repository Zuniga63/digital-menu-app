import { legacy_createStore as createStore, combineReducers, applyMiddleware, AnyAction } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware, { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';

import NavMenuReducer from './reducers/NavMenuReducer';
import CategoryReducer from './reducers/CategoryReducer';
import AuthReducer from './reducers/Auth';
import HomeReducer from './reducers/Home';
import { IAction } from './reducers/interfaces';

const rootReducer = combineReducers({ NavMenuReducer, CategoryReducer, AuthReducer, HomeReducer });

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<unknown, unknown, AnyAction>;
export type AppThunkAction = ThunkAction<void, unknown, unknown, AnyAction>;
export const actionBody = (type: string, payload?: any): IAction => ({
  type,
  payload,
});
