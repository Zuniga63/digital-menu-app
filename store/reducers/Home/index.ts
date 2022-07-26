/* eslint-disable default-param-last */
import { IAction, IProductHome } from '../interfaces';
import { HIDE_PRODUCT, SHOW_PRODUCT } from './actions';

export interface IHomeState {
  productDrawerOpened: boolean;
  product?: IProductHome;
}

const initialState: IHomeState = {
  productDrawerOpened: false,
  product: undefined,
};

export default function HomeReducer(state = initialState, action: IAction): IHomeState {
  switch (action.type) {
    case SHOW_PRODUCT: {
      return {
        ...state,
        productDrawerOpened: true,
        product: action.payload,
      };
    }
    case HIDE_PRODUCT: {
      return {
        ...state,
        productDrawerOpened: false,
      };
    }
    default:
      return state;
  }
}
