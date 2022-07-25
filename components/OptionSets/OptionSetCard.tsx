import React from 'react';
import { Button } from '@mantine/core';
import { IOptionSet } from 'pages/admin/set-de-opciones';
import { Trash } from 'tabler-icons-react';
import OptionItemCard from './OptionItemCard';

interface Props {
  optionSet: IOptionSet;
  deleteLoading: string;
  onDelete?(id: string): Promise<void>;
}
export default function OptionSetCard({ optionSet, deleteLoading, onDelete }: Props) {
  const handledClick = (): void => {
    if (onDelete) onDelete(optionSet.id);
  };
  return (
    <div>
      <header className="rounded-t-md bg-slate-800 py-3">
        <h3 className="text-center text-lg font-bold uppercase tracking-widest text-white">{optionSet.name}</h3>
      </header>
      <ul className="flex flex-col gap-y-4 border-x border-slate-800 border-opacity-20 bg-white bg-opacity-80 px-2 py-4 backdrop-blur">
        {optionSet.items.map((item) => (
          <OptionItemCard key={item.id} item={item} />
        ))}
      </ul>
      <footer className="rounded-b-md bg-slate-800 py-4 px-6">
        <Button
          color="red"
          fullWidth
          leftIcon={<Trash />}
          loading={deleteLoading === optionSet.id}
          disabled={!onDelete}
          onClick={handledClick}
        >
          Eliminar
        </Button>
      </footer>
    </div>
  );
}
