import { IAction, ICategory } from '../interfaces';
import {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  RESET_STORE_STATE,
  SET_ALL_CATEGORIES,
  SET_DELETE_ERROR,
  SET_DELETE_IS_SUCCESS,
  SET_DELETE_LOADING,
  SET_LOADING,
  SET_RELOAD,
  SET_STORE_ERROR,
  SET_STORE_IS_SUCCESS,
  SET_STORE_LOADING,
} from './actions';

export interface ICategoryState {
  categories: ICategory[];
  loading: boolean;
  storeLoading: boolean;
  storeError?: any;
  storeIsSuccess: boolean;
  updateLoading: boolean;
  deleteLoading: string;
  deleteIsSuccess: boolean;
  deleteError: string;
  reload: boolean;
}

const initialState: ICategoryState = {
  categories: [],
  loading: false,
  storeLoading: false,
  storeError: undefined,
  storeIsSuccess: false,
  updateLoading: false,
  deleteLoading: '',
  deleteIsSuccess: false,
  deleteError: '',
  reload: false,
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
        reload: false,
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
    case SET_DELETE_LOADING:
      return {
        ...state,
        deleteLoading: action.payload,
      };
    case SET_DELETE_IS_SUCCESS:
      return {
        ...state,
        deleteIsSuccess: action.payload,
      };
    case SET_DELETE_ERROR:
      return {
        ...state,
        deleteError: action.payload,
      };
    case REMOVE_CATEGORY: {
      /* const filter = state.categories.filter(
        (item) => item.id !== action.payload
      ); */

      return {
        ...state,
        categories: [],
      };
    }
    case SET_RELOAD:
      return {
        ...state,
        reload: action.payload,
      };
    default:
      return state;
  }
}
