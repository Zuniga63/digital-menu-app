/* eslint-disable react/jsx-props-no-spreading */
import { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from 'store/hooks';

export default function withAuth<T>(Component: NextComponentType<T>) {
  const Auth = (props: T) => {
    const router = useRouter();
    const { isAuth } = useAppSelector(({ AuthReducer }) => AuthReducer);

    useEffect(() => {
      if (!isAuth) {
        router.push('/');
      }
    }, []);

    if (!isAuth) {
      return null;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}
