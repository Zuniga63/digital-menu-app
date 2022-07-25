import React, { FormEvent, ReactNode } from 'react';
import { Button } from '@mantine/core';

interface Props {
  title: string;
  loading: boolean;
  onSubmit?(e: FormEvent<HTMLFormElement>): void;
  onCancel?(): void;
  children?: ReactNode;
  successButtonIcon?: ReactNode;
  cancelButtonIcon?: ReactNode;
}

export default function CustomForm({
  title,
  loading = false,
  onSubmit,
  onCancel,
  children,
  successButtonIcon,
  cancelButtonIcon,
}: Props) {
  return (
    <form className="-mt-11" onSubmit={onSubmit}>
      <header className="mb-6 border-b-4 border-double border-gray-600 pb-2">
        <h2 className="text-center text-xl font-bold text-gray-800">{title}</h2>
      </header>

      <div className="mb-6 flex flex-col gap-4">{children}</div>

      <footer className="flex justify-between">
        <Button type="button" onClick={onCancel} color="red" leftIcon={cancelButtonIcon} disabled={loading}>
          Cancelar
        </Button>

        <Button type="submit" leftIcon={successButtonIcon} disabled={loading} loading={loading}>
          Registrar
        </Button>
      </footer>
    </form>
  );
}
