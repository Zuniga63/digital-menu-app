import React, { useEffect, useState } from 'react';
import { Drawer } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { hideNavMenu, showMenu } from 'store/reducers/NavMenuReducer/actionCreators';
import { User } from 'tabler-icons-react';
import NavDrawerHeader from './NavDraverHeader';

export default function NavDrawer() {
  const [avatar, setAvatar] = useState('');

  const { menuIsOpen } = useAppSelector(({ NavMenuReducer }) => NavMenuReducer);
  const { user, isAuth } = useAppSelector(({ AuthReducer }) => AuthReducer);
  const dispatch = useAppDispatch();

  const largeScreen = useMediaQuery('(min-width: 768px)');

  const toggle = () => {
    if (menuIsOpen) {
      dispatch(hideNavMenu());
    } else {
      dispatch(showMenu());
    }
  };

  useEffect(() => {
    if (isAuth) {
      const name = user?.name.replaceAll(' ', '+');
      const url = `https://ui-avatars.com/api/?background=0d6efd&name=${name}`;
      setAvatar(url);
    }
  }, [isAuth]);

  return (
    <Drawer opened={menuIsOpen} onClose={toggle} padding={0} size={largeScreen ? 'md' : '100%'} withCloseButton={false}>
      <>
        <NavDrawerHeader />
        <div className="flex flex-col items-center p-8">
          <div className="relative mb-4 aspect-square w-1/3 overflow-hidden rounded-full bg-gray-100 shadow-new-tag">
            <div className="w-ful relative flex h-full items-center justify-center text-gray-400 text-opacity-40">
              {!isAuth && <User size={40} />}
              {isAuth && <Image src={avatar} alt={user?.name} layout="fill" />}
            </div>
          </div>
          {isAuth && <p className="mb-4 text-center font-display font-normal">{user?.name}</p>}
        </div>
      </>
    </Drawer>
  );
}
