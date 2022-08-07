import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Drawer, Modal, TextInput, PasswordInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { hideNavMenu, showMenu } from 'store/reducers/NavMenuReducer/actionCreators';
import { At, User, Lock } from 'tabler-icons-react';
import { LoginData } from 'store/reducers/interfaces';
import { authUser, logout } from 'store/reducers/Auth/actionCreators';
import { toast } from 'react-toastify';
import Link from 'next/link';
import NavDrawerHeader from './NavDraverHeader';

export default function NavDrawer() {
  const [modalOpened, setModalOpened] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');

  const { menuIsOpen } = useAppSelector(({ NavMenuReducer }) => NavMenuReducer);
  const { user, isAdmin, isAuth, loading, error } = useAppSelector(({ AuthReducer }) => AuthReducer);
  const dispatch = useAppDispatch();

  const largeScreen = useMediaQuery('(min-width: 768px)');

  const toggle = () => {
    if (menuIsOpen) {
      dispatch(hideNavMenu());
    } else {
      dispatch(showMenu());
    }
  };

  const closeModal = (): void => {
    if (!loading) {
      setModalOpened(false);
    }
  };

  const onSubmitHandled = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginData: LoginData = {
      email,
      password,
    };
    dispatch(authUser(loginData));
  };

  useEffect(() => {
    if (isAuth) {
      const name = user?.name.replaceAll(' ', '+');
      const url = `https://ui-avatars.com/api/?background=0d6efd&name=${name}`;
      setAvatar(url);
    }
    if (isAuth && modalOpened) closeModal();
  }, [isAuth]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <Drawer
        opened={menuIsOpen}
        onClose={toggle}
        padding={0}
        size={largeScreen ? 'md' : '100%'}
        withCloseButton={false}
      >
        <>
          <NavDrawerHeader />
          <div className="flex flex-col items-center p-8">
            <div className="relative mb-4 aspect-square w-1/3 overflow-hidden rounded-full bg-gray-100 shadow-new-tag">
              <div className="w-ful relative flex h-full items-center justify-center text-gray-400 text-opacity-40">
                {!isAuth && <User size={40} />}
                {isAuth && <Image src={avatar} alt={user?.name} layout="fill" />}
              </div>
            </div>
            {isAuth && (
              <>
                <p className="mb-4 text-center font-display font-normal">{user?.name}</p>
                <div className="flex w-full flex-grow flex-row-reverse justify-between">
                  <Button onClick={() => dispatch(logout())} size="xs" color="red">
                    Cerrar Sesión
                  </Button>
                  {isAdmin && (
                    <Link href="/admin/productos">
                      <Button size="xs" color="teal" onClick={toggle}>
                        Ir al panel
                      </Button>
                    </Link>
                  )}
                </div>
              </>
            )}
            {!isAuth && <Button onClick={() => setModalOpened(true)}>Iniciar Sesión</Button>}
          </div>
        </>
      </Drawer>

      <Modal opened={modalOpened} onClose={closeModal} withCloseButton={false}>
        <form onSubmit={onSubmitHandled}>
          <h2 className="text-center text-lg font-bold ">Iniciar Sessión</h2>

          <TextInput
            id="username"
            placeholder="Escribelo aquí."
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            disabled={loading}
            required
            label="Email"
            className="mb-4"
            type="email"
            icon={<At />}
          />

          <PasswordInput
            placeholder="********"
            label="Contraseña"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            disabled={loading}
            required
            icon={<Lock />}
            className="mb-8"
          />

          <div className="flex justify-between">
            <Button color="red" type="reset" onClick={closeModal} disabled={loading}>
              Cancelar
            </Button>

            <Button loading={loading} type="submit">
              {loading ? <span>Procesando</span> : <span>Iniciar Sesión</span>}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
