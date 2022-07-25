/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import { MantineProvider } from '@mantine/core';
import { ToastContainer } from 'react-toastify';

import { useAppDispatch } from 'store/hooks';
import { SET_USER } from 'store/reducers/Auth/actions';
import { actionBody, store, wrapper } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL_API;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      axios.defaults.headers.common.Authorization = `Beare ${token}`;
      dispatch(actionBody(SET_USER, JSON.parse(user)));
    }
  }, []);
  return (
    <Provider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionOptions={{ key: 'mantine', prepend: false }}
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
          fontFamily: "'Roboto', 'sans-serif'",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>

      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
