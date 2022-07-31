import React, { useState } from 'react';
import { IOptionSet } from 'pages/admin/set-de-opciones';

import { Button, Collapse } from '@mantine/core';
import { Trash, Plus, Minus } from 'tabler-icons-react';
import OptionItemCard from './OptionItemCard';

interface Props {
  optionSet: IOptionSet;
  deleteLoading: string;
  onDelete?(id: string): Promise<void>;
}
export default function OptionSetCard({ optionSet, deleteLoading, onDelete }: Props) {
  //-------------------------------------------------------------------
  // STATE
  //-------------------------------------------------------------------
  const [opened, setOpened] = useState(false);

  //-------------------------------------------------------------------
  // Methods
  //-------------------------------------------------------------------
  const handledClick = (): void => {
    if (onDelete) onDelete(optionSet.id);
  };
  return (
    <div>
      <header className="flex gap-x-2 rounded-t-md bg-slate-800 py-3 px-4">
        <h3 className="flex-grow text-center text-lg font-bold uppercase tracking-widest text-white">
          {optionSet.name}
        </h3>
        <button type="button" className="flex-shrink-0 grow-0 text-light" onClick={() => setOpened(!opened)}>
          {!opened ? <Plus /> : <Minus />}
        </button>
      </header>
      <Collapse in={opened}>
        <ul className="flex flex-col gap-y-4 border-x border-slate-800 border-opacity-20 bg-white bg-opacity-80 px-2 py-4 backdrop-blur">
          {optionSet.items.map((item) => (
            <OptionItemCard key={item.id} item={item} />
          ))}
        </ul>
      </Collapse>
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
