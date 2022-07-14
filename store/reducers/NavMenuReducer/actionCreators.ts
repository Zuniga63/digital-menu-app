import { Dispatch } from 'redux';
import { HIDE_NAV_MENU, SHOW_NAV_MENU } from './actions';

export const showMenu = () => (dispatch: Dispatch) => {
  return dispatch({ type: SHOW_NAV_MENU });
};

export const hideNavMenu = () => (dispatch: Dispatch) => {
  return dispatch({ type: HIDE_NAV_MENU });
};
