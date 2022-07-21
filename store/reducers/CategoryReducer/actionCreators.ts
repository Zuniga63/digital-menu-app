/* eslint-disable no-console */
import axios from 'axios';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import { actionBody, AppThunkAction } from 'store';

import {
  ADD_CATEGORY,
  RESET_STORE_STATE,
  SET_ALL_CATEGORIES,
  SET_LOADING,
  SET_STORE_ERROR,
  SET_STORE_IS_SUCCESS,
  SET_STORE_LOADING,
} from './actions';

const api = process.env.NEXT_PUBLIC_URL_API;

// eslint-disable-next-line import/prefer-default-export
export const getAllCategories = (): AppThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(actionBody(SET_LOADING, true));
      const url = `${api}/product-categories`;
      const res = await axios.get(url);
      const { categories, ok } = res.data;
      if (ok) {
        dispatch(actionBody(SET_ALL_CATEGORIES, categories));
      }
    } catch (error: any) {
      const { response, request } = error;
      if (response) {
        toast.error(response.data.message);
      } else if (request) {
        toast.error('Error al realizar la petición HTTP');
        console.error(request);
      } else {
        toast.error('Error desconocido al cargar las categorías.');
        console.error(error);
      }
    } finally {
      dispatch(actionBody(SET_LOADING, false));
    }
  };
};

export const storeCategory = (formData: FormData): AppThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(actionBody(SET_STORE_LOADING, true));
      const url = `${api}/product-categories`;

      const res = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { category, ok } = res.data;

      if (ok && category) {
        /* const message = `La categoría: ${category.name} fue registrada con éxito.`;
        toast.success(message); */
        dispatch(actionBody(ADD_CATEGORY, category));
        dispatch(actionBody(SET_STORE_ERROR, undefined));
        dispatch(actionBody(SET_STORE_IS_SUCCESS, true));
      }
    } catch (error: any) {
      dispatch(actionBody(SET_STORE_IS_SUCCESS, false));
      const { response, request } = error;
      if (response) {
        const { data: errorData } = response;
        /* toast.error(errorData.message); */
        dispatch(actionBody(SET_STORE_ERROR, errorData));
      } else if (request) {
        toast.error('Error al realizar la petición HTTP');
        console.error(request);
      } else {
        toast.error('Error desconocido al lanzar la petición.');
        console.error(error);
      }
    } finally {
      dispatch(actionBody(SET_STORE_LOADING, false));
    }
  };
};

export const resetStoreState = () => (dispatch: Dispatch) => {
  return dispatch(actionBody(RESET_STORE_STATE));
};
