/* eslint-disable no-console */
import axios from 'axios';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import { actionBody, AppThunkAction } from 'store';
import { IUser, LoginData } from '../interfaces';
import { LOGOUT, SET_ERROR, SET_LOADING, SET_USER } from './actions';

interface AuthResponse {
  ok: boolean;
  message?: string;
  warnings?: string[];
  token?: string;
  user?: IUser;
}

const baseUrl = '/auth/local/signin';

export const authUser = (loginData: LoginData): AppThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(actionBody(SET_LOADING, true));
      dispatch(actionBody(SET_ERROR, ''));
      const res = await axios.post(baseUrl, loginData);
      const { ok, token, user }: AuthResponse = res.data;
      if (ok) {
        dispatch(actionBody(SET_USER, user));
        if (typeof window !== 'undefined' && token) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
        }
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

export const logout = () => (dispatch: Dispatch) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  return dispatch(actionBody(LOGOUT));
};
