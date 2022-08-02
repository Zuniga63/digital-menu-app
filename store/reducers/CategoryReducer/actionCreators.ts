/* eslint-disable no-console */
import axios from 'axios';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import { actionBody, AppThunkAction } from 'store';

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
  SET_UPDATING_STATE,
  UPDATE_CATEGORY_STATE,
} from './actions';
import { ICategory } from '../interfaces';

const baseUrl = '/product-categories';

export interface IAllCategoriesResponse {
  ok: boolean;
  categories: ICategory[];
}

export const getAllCategories = (): AppThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(actionBody(SET_LOADING, true));
      const url = `${baseUrl}`;
      const res = await axios.get(url);
      const { categories, ok }: IAllCategoriesResponse = res.data;

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
      const url = `${baseUrl}`;

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

export const deleteCategory = (categoryId: string): AppThunkAction => {
  return async (dispatch) => {
    const url = `${baseUrl}/${categoryId}`;
    let isOk = false;

    try {
      dispatch(actionBody(SET_DELETE_LOADING, categoryId));
      const res = await axios.delete(url);
      if (res.data.ok) {
        isOk = true;
        dispatch(actionBody(SET_DELETE_IS_SUCCESS, true));
      }
    } catch (error: any) {
      const { response, request } = error;

      if (response) {
        const { data, status } = response;
        console.log(data, status, typeof status);
        dispatch(actionBody(SET_DELETE_ERROR, data?.message));
        if (status === 404) {
          console.log('reload');
          dispatch(actionBody(SET_RELOAD, true));
        }
      } else if (request) {
        toast.error('Error al realizar la petición HTTP');
        console.error(request);
      } else {
        toast.error('Error desconocido al lanzar la petición.');
        console.error(error);
      }
    } finally {
      setTimeout(() => {
        if (isOk) {
          dispatch(actionBody(REMOVE_CATEGORY, categoryId));
        }
        dispatch(actionBody(SET_DELETE_LOADING, ''));
        dispatch(actionBody(SET_DELETE_ERROR, ''));
        dispatch(actionBody(SET_DELETE_IS_SUCCESS, false));
      }, 1000);
    }
  };
};

export const updateCategoryState = (categoryId: string, enabled: boolean): AppThunkAction => {
  return async (dispatch) => {
    const url = `${baseUrl}/${categoryId}/${enabled ? 'enable' : 'disable'}`;
    dispatch(actionBody(SET_UPDATING_STATE, categoryId));

    try {
      const res = await axios.put(url);
      const { data } = res;
      if (data.ok) {
        dispatch(actionBody(UPDATE_CATEGORY_STATE, { categoryId, enabled }));
      }
    } catch (error) {
      toast.error(`No se pudo ${enabled ? 'habilitar' : 'deshabilitar'} la categoría.`);
    } finally {
      dispatch(actionBody(SET_UPDATING_STATE, ''));
    }
  };
};
