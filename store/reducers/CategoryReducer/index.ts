import { IAction } from '../interfaces';
import { SET_LOADING } from './actions';

export interface ICategoryState {
  categories: [];
  loading: boolean;
}

const initialState: ICategoryState = {
  categories: [],
  loading: false,
};

// eslint-disable-next-line default-param-last
export default function CategoryReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
