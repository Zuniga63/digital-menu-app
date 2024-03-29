/* eslint-disable default-param-last */
import { IAction, ICategory } from '../interfaces';
import {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  RESET_STORE_STATE,
  SET_ALL_CATEGORIES,
  SET_CATEGORY_TO_UPDATE,
  SET_DELETE_ERROR,
  SET_DELETE_IS_SUCCESS,
  SET_DELETE_LOADING,
  SET_LOADING,
  SET_RELOAD,
  SET_STORE_ERROR,
  SET_STORE_IS_SUCCESS,
  SET_STORE_LOADING,
  SET_UPDATE_ERROR,
  SET_UPDATE_IS_SUCCESS,
  SET_UPDATE_LOADING,
  SET_UPDATING_STATE,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_STATE,
} from './actions';

export interface ICategoryState {
  categories: ICategory[];
  loading: boolean;
  storeLoading: boolean;
  storeError?: any;
  storeIsSuccess: boolean;

  categoryToUpdate?: ICategory;
  updateLoading: boolean;
  updateError?: any;
  updateIsSuccess: boolean;

  deleteLoading: string;
  deleteIsSuccess: boolean;
  deleteError: string;
  reload: boolean;

  updatingState: string;
}

const initialState: ICategoryState = {
  categories: [],

  loading: false,
  storeLoading: false,
  storeError: undefined,
  storeIsSuccess: false,

  categoryToUpdate: undefined,
  updateLoading: false,
  updateError: undefined,
  updateIsSuccess: false,

  deleteLoading: '',
  deleteIsSuccess: false,
  deleteError: '',
  reload: false,

  updatingState: '',
};

export default function CategoryReducer(state = initialState, action: IAction): ICategoryState {
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
    case ADD_CATEGORY: {
      const { categories } = state;
      return {
        ...state,
        categories: [...categories, action.payload],
      };
    }
    case UPDATE_CATEGORY: {
      const newCategory: ICategory = action.payload;
      const list = state.categories.map((category) => {
        if (category.id === newCategory.id) {
          return { ...category, ...newCategory };
        }

        return category;
      });

      return {
        ...state,
        categories: list,
      };
    }
    case REMOVE_CATEGORY: {
      const filter = state.categories.filter((item) => item.id !== action.payload);

      return {
        ...state,
        categories: [...filter],
      };
    }
    case SET_STORE_LOADING:
      return {
        ...state,
        storeLoading: action.payload,
      };
    case SET_STORE_ERROR:
      return {
        ...state,
        storeError: action.payload,
      };
    case SET_STORE_IS_SUCCESS:
      return {
        ...state,
        storeLoading: false,
        storeIsSuccess: action.payload,
      };
    case RESET_STORE_STATE:
      return {
        ...state,
        storeError: undefined,
        storeLoading: false,
        storeIsSuccess: false,
        categoryToUpdate: undefined,
        updateLoading: false,
        updateError: undefined,
        updateIsSuccess: false,
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
    case SET_RELOAD:
      return {
        ...state,
        reload: action.payload,
      };
    case SET_UPDATING_STATE: {
      return {
        ...state,
        updatingState: action.payload,
      };
    }
    case UPDATE_CATEGORY_STATE: {
      const { categoryId, enabled } = action.payload;
      const list = state.categories.map((category) => {
        if (category.id === categoryId) {
          return { ...category, isEnabled: enabled };
        }

        return category;
      });

      return {
        ...state,
        categories: list,
      };
    }
    case SET_CATEGORY_TO_UPDATE: {
      return {
        ...state,
        categoryToUpdate: action.payload,
      };
    }
    case SET_UPDATE_LOADING: {
      return {
        ...state,
        updateLoading: action.payload,
      };
    }
    case SET_UPDATE_ERROR: {
      return {
        ...state,
        updateError: action.payload,
      };
    }
    case SET_UPDATE_IS_SUCCESS: {
      return {
        ...state,
        updateLoading: false,
        updateError: undefined,
        updateIsSuccess: action.payload,
      };
    }
    default:
      return state;
  }
}
