/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';

import { Provider } from 'react-redux';

import type { AppProps } from 'next/app';

import { MantineProvider } from '@mantine/core';

import { store, wrapper } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
