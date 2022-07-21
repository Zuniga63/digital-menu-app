import { IAction } from '../interfaces';
import {
  ADD_CATEGORY,
  RESET_STORE_STATE,
  SET_ALL_CATEGORIES,
  SET_LOADING,
  SET_STORE_ERROR,
  SET_STORE_IS_SUCCESS,
  SET_STORE_LOADING,
} from './actions';

export interface ICategoryState {
  categories: any[];
  loading: boolean;
  storeLoading: boolean;
  storeError?: any;
  storeIsSuccess: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}

const initialState: ICategoryState = {
  categories: [],
  loading: false,
  storeLoading: false,
  storeError: undefined,
  storeIsSuccess: false,
  updateLoading: false,
  deleteLoading: false,
};

export default function CategoryReducer(
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: IAction
): ICategoryState {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_STORE_LOADING:
      return {
        ...state,
        storeLoading: action.payload,
      };
    case ADD_CATEGORY: {
      const { categories } = state;
      return {
        ...state,
        categories: [...categories, action.payload],
      };
    }
    case SET_STORE_ERROR:
      return {
        ...state,
        storeError: action.payload,
      };
    case SET_STORE_IS_SUCCESS:
      return {
        ...state,
        storeIsSuccess: action.payload,
      };
    case RESET_STORE_STATE:
      return {
        ...state,
        storeError: undefined,
        storeLoading: false,
        storeIsSuccess: false,
      };
    default:
      return state;
  }
}
