import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { Button, Modal, TextInput, PasswordInput } from '@mantine/core';
import { At, Lock } from 'tabler-icons-react';
import { LoginData } from 'store/reducers/interfaces';
import { authUser, closeLogin } from 'store/reducers/Auth/actionCreators';
import { toast } from 'react-toastify';

export default function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginOpened, loading, error } = useAppSelector(({ AuthReducer }) => AuthReducer);

  const dispatch = useAppDispatch();

  const closeModal = (): void => {
    if (!loading) {
      dispatch(closeLogin());
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
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Modal opened={loginOpened} onClose={closeModal} withCloseButton={false}>
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
  );
}
