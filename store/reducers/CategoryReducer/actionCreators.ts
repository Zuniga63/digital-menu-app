import axios from 'axios';
import { toast } from 'react-toastify';
import { actionBody, AppThunkAction } from 'store';

import { SET_ALL_CATEGORIES, SET_LOADING } from './actions';

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
