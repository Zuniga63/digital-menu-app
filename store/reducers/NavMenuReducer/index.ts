import { IAction } from '../interfaces';
import { SHOW_NAV_MENU, HIDE_NAV_MENU } from './actions';

export interface INavMenuReducerState {
  menuIsOpen: boolean;
}

const initialState: INavMenuReducerState = {
  menuIsOpen: false,
};

export default function NavMenuReducer(
  // eslint-disable-next-line default-param-last
  state: INavMenuReducerState = initialState,
  action: IAction
) {
  switch (action.type) {
    case SHOW_NAV_MENU:
      return {
        ...state,
        menuIsOpen: true,
      };
    case HIDE_NAV_MENU:
      return {
        ...state,
        menuIsOpen: false,
      };
    default:
      return state;
  }
}
