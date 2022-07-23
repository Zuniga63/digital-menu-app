import React from 'react';
import { Trash } from 'tabler-icons-react';
import { Checkbox } from '@mantine/core';
import { IOptionItem } from 'pages/admin/set-de-opciones';
import { IOptionItem as IStore } from './OptionSetForm';

interface Props {
  item: IStore | IOptionItem;
  onRemove?(id: number | string): void;
}

export default function OptionItemCard({ item, onRemove }: Props) {
  const handledClick = () => {
    if (onRemove) onRemove(item.id);
  };

  return (
    <li className="flex items-center justify-between rounded-sm bg-gray-100 p-2 shadow">
      <Checkbox label={item.name} checked={item.isEnabled} readOnly size="md" />

      <button
        type="button"
        className="rounded-full bg-red-600 p-2 text-white transition-colors duration-200 disabled:bg-opacity-40"
        onClick={handledClick}
        disabled={!onRemove}
      >
        <Trash size={18} strokeWidth={3} />
      </button>
    </li>
  );
}
