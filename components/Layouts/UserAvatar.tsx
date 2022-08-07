import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { Avatar, Menu } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { logout, openLogin } from 'store/reducers/Auth/actionCreators';

export default function UserAvatar() {
  const { user, isAuth, isAdmin } = useAppSelector(({ AuthReducer }) => AuthReducer);
  const [avatarUrl, setAvatarUrl] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) {
      const name = user?.name.replaceAll(' ', '+');
      const url = `https://ui-avatars.com/api/?background=0d6efd&name=${name}`;
      setAvatarUrl(url);
    } else {
      setAvatarUrl('');
    }
  }, [isAuth]);

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar radius="xl" color="dark" src={avatarUrl} />
      </Menu.Target>
      <Menu.Dropdown>
        {!isAuth && <p className="my-2 text-center text-xs text-dark">No has iniciado sesión</p>}
        {isAuth && (
          <>
            <div className="mb-2 px-2">
              <p className="text-center text-sm text-dark">
                Bienvenido <span className="font-bold">{user?.name}</span>
              </p>
              <p className="scale-90 text-center text-xs text-gray-600">{user?.email}</p>
            </div>
            <Menu.Divider />
          </>
        )}
        {isAdmin && (
          <>
            <Menu.Label>Administración</Menu.Label>
            <Menu.Item component={NextLink} href="/admin/productos">
              Panel de administración
            </Menu.Item>
            <Menu.Divider />
          </>
        )}
        {isAuth ? (
          <Menu.Item color="red" onClick={() => dispatch(logout())}>
            Cerrar Sesión
          </Menu.Item>
        ) : (
          <Menu.Item color="blue" onClick={() => dispatch(openLogin())}>
            <p className="text-center">Iniciar Sesión</p>
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
