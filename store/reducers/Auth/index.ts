/* eslint-disable default-param-last */
import { IAction, IUser } from '../interfaces';
import { CLOSE_LOGIN, LOGOUT, OPEN_LOGIN, SET_ERROR, SET_LOADING, SET_USER } from './actions';

export interface AuthStore {
  isAuth: boolean;
  user?: IUser;
  error: null | string;
  isAdmin: boolean;
  loading: boolean;
  loginOpened: boolean;
}

const initialState: AuthStore = {
  isAuth: false,
  user: undefined,
  error: null,
  isAdmin: false,
  loading: false,
  loginOpened: false,
};

export default function AuthReducer(state = initialState, action: IAction): AuthStore {
  switch (action.type) {
    case OPEN_LOGIN: {
      return {
        ...state,
        loginOpened: true,
      };
    }
    case CLOSE_LOGIN: {
      return {
        ...state,
        loginOpened: false,
      };
    }
    case SET_USER:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
        isAdmin: action.payload?.role === 'ADMIN',
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case LOGOUT: {
      return {
        ...state,
        isAuth: false,
        user: undefined,
        error: null,
        isAdmin: false,
        loading: false,
      };
    }
    default:
      return state;
  }
}
