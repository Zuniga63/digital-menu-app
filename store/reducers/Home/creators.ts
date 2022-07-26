import { Dispatch } from 'redux';
import { actionBody } from 'store';
import { IProductHome } from '../interfaces';
import { HIDE_PRODUCT, SHOW_PRODUCT } from './actions';

export const showProduct = (product: IProductHome) => (dispatch: Dispatch) =>
  dispatch(actionBody(SHOW_PRODUCT, product));

export const hideProduct = () => (dispatch: Dispatch) => dispatch(actionBody(HIDE_PRODUCT));
